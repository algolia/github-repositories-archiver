const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

async function archive(config) {
  if (config.repositories.length < 1) {
    console.log(`✨  Nothing to archive.`);
    return;
  }

  console.log(`🚜  Archiving ${config.repositories.map(repo => chalk.green(repo.full_name)).join(', ')}.`);
  console.log();

  const x = function(...args) {
    console.log('[EXEC]  ', ...args);
    exec(...args);
  };

  try {
    await x(`mkdir -p "${config.path}"`);
    await x(`cd "${config.path}" && test -d .git || git init . && git commit --allow-empty -m "Initial commit"`);
    for (const repo of config.repositories) {
      await x(
        `cd "${config.path}" && test -d "${repo.name}" || git subtree add -P "${repo.name}" "${repo.ssh_url}" ${
          repo.default_branch
        }`
      );
      if (config.dryRun) {
        console.log(`[DRYRUN] deleting ${repo.owner.login}/${repo.name}`);
      } else {
        console.log(`[EXEC]   deleting ${repo.owner.login}/${repo.name}`);
        // const ghRepo = config.gh.getRepo(repo.owner.login, repo.name);
        // await ghRepo.deleteRepo();
      }
    }
    console.log();
    console.log(`✨  Done.`);
  } catch (e) {
    console.error(e);
  }
}

module.exports = archive;
