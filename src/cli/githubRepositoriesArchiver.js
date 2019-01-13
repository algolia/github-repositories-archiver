const path = require('path');
const chalk = require('chalk');
const ghauth = require('ghauth');
const GitHub = require('github-api');
const fuzzy = require('fuzzy');
const moment = require('moment');
const inquirer = require('inquirer');
inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

const checkConfig = require('./checkConfig');
const archive = require('../tasks/archive');

const authOptions = {
  configName: 'github-repositories-archiver',
  note: 'This token is used for github-repositories-archiver.',
  scopes: ['user', 'repo']
};

function githubRepositoriesArchiver(archivePath, options) {
  new Promise((resolve, reject) => {
    ghauth(authOptions, (err, authData) => {
      if (err) {
        reject(err);
      }
      resolve(authData);
    });
  }).then((authData) => {
    console.log(`🔑  ${chalk.green('Connected')} as ${chalk.cyan(authData.user)}.`);

    const gh = new GitHub({
      username: authData.user,
      token: authData.token
    });

    function sortRepositoriesByDate(repositories) {
      return repositories.sort((a, b) => a.value.updated_at < b.value.updated_at ? -1 : (a.updated_at > b.updated_at ? 1 : 0));
    }

    async function run() {
      console.log(`🚜  Archiving repositories to ${chalk.cyan(archivePath)}.`);

      const config = {
        organization: options.organization,
        minMonths: +options.minMonths || 0,
        dryRun: options.dryRun === true,
        onlyPrivate: options.onlyPrivate === true,
        path: archivePath ? path.resolve(archivePath) : '',
      };

      checkConfig(config);

      config.gh = gh;

      console.log(`⏬  Loading ${chalk.bold(config.organization || authData.user)}'s GitHub repositories...`);
      const repositories = (await (config.organization !== undefined ? gh.getOrganization(config.organization).getRepos() : gh.getUser().listRepos())).data.
        reduce((results, e) => {
          if (config.onlyPrivate && !e.private) {
            return results;
          }
          const numberOfMonthsSinceUpdated = moment.duration(moment().diff(moment(e.updated_at))).asMonths();
          if (numberOfMonthsSinceUpdated < config.minMonths) {
            return results;
          }
          const emojis = numberOfMonthsSinceUpdated < 12 ? '' :
            numberOfMonthsSinceUpdated < 18 ? ' 😅' :
            numberOfMonthsSinceUpdated < 24 ? ' 😅😅' : ' 😅😅😅';
          const lock = e.private ? ' 🔒' : '';
          results[e.full_name] = {
            name: `${e.full_name}${lock} (${chalk.bold(e.stargazers_count)} ⭐️, last updated ${chalk.bold(moment(e.updated_at).fromNow())}${emojis})`,
            value: e,
            short: e.full_name
          };
          return results;
        }, {});
      const repositoryNames = Object.keys(repositories);

      const questions = [
        {
          type: 'checkbox-plus',
          name: 'repositories',
          message: 'Select GitHub repositories to archive (use <SPACE> to select, <UP> & <DOWN> to navigate, type to search)',
          pageSize: 25,
          highlight: true,
          searchable: true,
          source: (answersSoFar, input) => {
            input = input || '';
            return new Promise(function(resolve) {
              const matchingNames = fuzzy.filter(input, repositoryNames).map(e => e.original);
              let matchingRepositories = [];
              resolve(sortRepositoriesByDate(matchingNames.reduce((results, name) => {
                results.push(repositories[name]);
                return results;
              }, [])));
            });
          },
          validate(input) {
            return Boolean(input);
          },
        },
      ];

      console.log();
      const answers = await inquirer.prompt(questions);
      console.log();
      config.repositories = answers.repositories;

      await archive(config);
    }

    run().catch(err => {
      console.error(err);
      console.log();
      process.exit(1);
    });
  }).catch(err => {
    console.error(err);
    console.log();
    process.exit(1);
  });
}

module.exports = githubRepositoriesArchiver;
