# GitHub Repositories Archiver

> 🚜 Archive GitHub Repositories within another repository's subdirs

[![Build Status][travis-svg]][travis-url] [![Version][version-svg]][package-url] [![License][license-image]][license-url]

`github-repositories-archiver` is a command line utility that helps you archive GitHub repositories into a single repository's subdirs.

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
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## Get started

> The tool requires Node ≥ 8.

```
npx github-repositories-archiver /tmp/archives
cd /tmp/archives
git push
```

> [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a tool introduced in `npm@5.2.0` that makes it possible to run CLI tools hosted on the npm registry.

## Usage

```
$ github-repositories-archiver --help

Usage: github-repositories-archiver <archive-directory> [options]

Options:
  -v, --version         output the version number
  --dry-run             do not delete nor push repositories
  --only-private        only consider private repositories
  --organization <org>  the organization to restrict to
  --min-months <n>      the minimum number of months since a repository was updated. Others will be hidden from the list
  -h, --help            output usage information
```

## License

GitHub Repositories Archiver is [MIT licensed](LICENSE).

<!-- Badges -->

[version-svg]: https://img.shields.io/npm/v/github-repositories-archiver.svg?style=flat-square
[package-url]: https://npmjs.org/package/github-repositories-archiver
[travis-svg]: https://img.shields.io/travis/algolia/github-repositories-archiver/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/algolia/github-repositories-archiver
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
