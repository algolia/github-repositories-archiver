# GitHub Repositories Archiver

> 🚜 Archive GitHub Repositories within another repository's subdirs

[![Build Status][travis-svg]][travis-url] [![Version][version-svg]][package-url] [![License][license-image]][license-url]

`github-repositories-archiver` is a command line utility that helps you archive (aka: backup & delete) GitHub repositories into a single repository's subdirs.

<!-- <p align="center">
  <img src="preview.png" width="800" alt="Preview">
</p>
 -->
<details>
  <summary><strong>Contents</strong></summary>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get started](#get-started)
- [Usage](#usage)
- [API](#api)
- [Tutorials](#tutorials)
- [Previews](#previews)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## Get started

> The tool requires Node ≥ 8.

```
npx github-repositories-archiver archives
cd archives
git push
```

> [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a tool introduced in `npm@5.2.0` that makes it possible to run CLI tools hosted on the npm registry.

## Usage

```
$ github-repositories-archiver --help

  Usage: github-repositories-archiver <archive-directory> [options]

  Options:

    -v, --version                                      output the version number
    --dry-run.                                         Just print, do nothing
    --config <config>                                  The configuration file to get the options from to avoid the interactive CLI
    -h, --help                                         output usage information
```

#### `--config`

The `config` flag is handy to automate repositories archiving.

<h6 align="center">config.json</h6>

```json
{
  "name": "my-app",
  "dryRyn": false,
  "repositories": ["algolia/old1", "algolia/old2"]
}
```

Archive repositories described in the configuration:

```
github-repositories-archiver ./archives --config config.json
```

## License

Create InstantSearch App is [MIT licensed](LICENSE).

<!-- Badges -->

[version-svg]: https://img.shields.io/npm/v/github-repositories-archiver.svg?style=flat-square
[package-url]: https://npmjs.org/package/github-repositories-archiver
[travis-svg]: https://img.shields.io/travis/algolia/github-repositories-archiver/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/algolia/github-repositories-archiver
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
