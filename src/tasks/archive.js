const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

function archive(config) {
  if (config.repositories.length < 1) {
    console.log(`✨  Nothing to archive.`);
    return;
  }

  console.log(`🚜  Archiving ${config.repositories.map(repo => chalk.green(repo.full_name)).join(', ')}.`);
  console.log();

  const x = function(...args) {
    console.log('[EXEC]  ', ...args);
    return exec(...args);
  };

  let chain = x(`mkdir -p "${config.path}"`);
  chain = chain.then(() => x(`cd "${config.path}" && (test -d .git || (git init . && git commit --allow-empty -m "Initial commit"))`));
  for (const repo of config.repositories) {
    chain = chain.then(() => x(
      `cd "${config.path}" && (test -d "${repo.name}" || git subtree add -P "${repo.name}" "${repo.ssh_url}" ${
        repo.default_branch
      })`
    )).then(() => {
      if (config.dryRun) {
        console.log(`[DRYRUN] deleting ${repo.owner.login}/${repo.name}`);
        return Promise.resolve();
      } else {
        console.log(`[EXEC]   deleting ${repo.owner.login}/${repo.name}`);
        const ghRepo = config.gh.getRepo(repo.owner.login, repo.name);
        return ghRepo.deleteRepo();
      }
    });
  }
  chain.then(() => {
    console.log();
    console.log(`✨  Done.`);
  }).catch((e) => console.error(e));
}

module.exports = archive;
