const path = require('path');
const chalk = require('chalk');
const ghauth = require('ghauth');
const GitHub = require('github-api');
const moment = require('moment');
const inquirer = require('inquirer');
const ora = require('ora');
const cfg = require('application-config');

const checkConfig = require('./checkConfig');
const archive = require('../tasks/archive');

const authOptions = {
  configName: 'github-repositories-archiver',
  note: 'This token is used for github-repositories-archiver.',
  scopes: ['user', 'repo', 'delete_repo'],
};

function githubRepositoriesArchiver(archivePath, options) {
  new Promise((resolve, reject) => {
    if (options.login === true) {
      // login forced, removing the configuration
      cfg(authOptions.configName).trash(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  })
    .then(
      () =>
        new Promise((resolve, reject) => {
          ghauth(authOptions, (err, authData) => {
            if (err) {
              reject(err);
            }
            resolve(authData);
          });
        })
    )
    .then(authData => {
      console.log(`🔑  ${chalk.green('Connected')} as ${chalk.cyan(authData.user)}.`);

      const gh = new GitHub({
        username: authData.user,
        token: authData.token,
      });

      async function run() {
        console.log(`🚜  Archiving repositories to ${chalk.cyan(archivePath)}.`);

        const config = {
          organization: options.organization,
          minMonths: Number(options.minMonths) || 0,
          dryRun: options.dryRun === true,
          onlyAdmin: options.onlyAdmin === true,
          onlyPrivate: options.onlyPrivate === true,
          repositoriesInput: options.repositories ? options.repositories.split(',') : false,
          path: archivePath ? path.resolve(archivePath) : '',
        };

        checkConfig(config);

        config.gh = gh;

        const spinner = ora(
          `  Loading ${chalk.bold(config.organization || authData.user)}'s GitHub repositories...`
        ).start();
        
        const repositories = (await (config.organization !== undefined
          ? gh.getOrganization(config.organization).getRepos()
          : gh.getUser().listRepos())).data.filter(e => {
          
          if(config.repositoriesInput.length && !config.repositoriesInput.includes(e.name)){
            return false;          
          }
          if (config.onlyAdmin && !e.permissions.admin) {
            return false;
          }
          if (config.onlyPrivate && !e.private) {
            return false;
          }
          const numberOfMonthsSinceUpdated = moment.duration(moment().diff(moment(e.updated_at))).asMonths();
          if (numberOfMonthsSinceUpdated < config.minMonths) {
            return false;
          }
          return true;
        }, {});

        const choices = JSON.parse(JSON.stringify(repositories)).map(e => {
          const lock = e.private ? ' 🔒' : '';
          e.name = `${e.full_name}${lock} (${chalk.bold(e.stargazers_count)} ⭐️, last updated ${chalk.bold(
            moment(e.updated_at).fromNow()
          )}) ${e.permissions.admin ? '' : chalk.red(' non-deletable')}`;
          e.value = e.full_name;
          return e;
        });
        
        spinner.succeed(`  Loaded ${chalk.bold(choices.length)} repositories.`);
        
        const questions = [
          {
            type: 'checkbox',
            name: 'repositories',
            message:
              `Select GitHub repositories to archive (Press ${chalk.cyan('<space>')} to select, ${chalk.cyan('<a>')} to toggle all, ${chalk.cyan('<i>')} to invert selection)`,
    
              choices
          },
        ];

        const answers = await inquirer.prompt(questions);
        config.repositories = repositories.filter(e => answers.repositories.includes(e.full_name));
        archive(config);
      }

      run().catch(err => {
        console.error(err);
        console.log();
        process.exit(1);
      });
    })
    .catch(err => {
      console.error(err);
      console.log();
      process.exit(1);
    });
}

module.exports = githubRepositoriesArchiver;
