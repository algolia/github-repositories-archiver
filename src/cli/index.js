#! /usr/bin/env node

const process = require('process');
const program = require('commander');
const chalk = require('chalk');

const githubRepositoriesArchiver = require('./githubRepositoriesArchiver');
const { version } = require('../../package.json');

let archivePath;
let options = {};

process.on('SIGINT', () => {
  process.exit(3);
});

program
  .version(version, '-v, --version')
  .arguments('<archive-directory>')
  .usage(`${chalk.green('<archive-directory>')} [options]`)
  .option('--dry-run', 'do not delete nor push repositories')
  .option('--login', 'force login to happen again')
  .option('--only-private', 'only consider private repositories')
  .option('--organization <org>', 'the organization to restrict to')
  .option(
    '--min-months <n>',
    'the minimum number of months since a repository was updated. Others will be hidden from the list'
  )
  .action((dest, opts) => {
    archivePath = dest;
    options = opts;
  })
  .parse(process.argv);

if (!archivePath) {
  console.log('Please specify the archive directory:');
  console.log();
  console.log(`  ${chalk.cyan('github-repositories-archiver')} ${chalk.green('<archive-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan('github-repositories-archiver')} ${chalk.green('~/dev/archive')}`);
  console.log();
  console.log(`Run ${chalk.cyan('github-repositories-archiver --help')} to see all options.`);

  process.exit(1);
}

if (options.rawArgs.indexOf('--help') > -1 || options.rawArgs.indexOf('-h') > -1) {
  program.help();
  process.exit(1);
}

githubRepositoriesArchiver(archivePath, options);
