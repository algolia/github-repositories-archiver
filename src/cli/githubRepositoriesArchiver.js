const archiveTask = require('../tasks/archive');

function noop() {}

async function githubRepositoriesArchiver(archivePath, config, tasks = {}) {
  const {
    setup = noop,
    archive = archiveTask,
    teardown = noop,
  } = tasks;

  try {
    await setup(config);
  } catch (err) {
    return;
  }

  try {
    await archive(config);
  } catch (err) {
    return;
  }

  await teardown(config);
}

module.exports = githubRepositoriesArchiver;
