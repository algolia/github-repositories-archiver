# Contributing to GitHub Repositories Archiver

Thank you for wanting to get involved in GitHub Repositories Archiver! The goal of the CLI is to enable users to archive GitHub repositories within a single repository's subdirs.

<details>
  <summary><strong>Contents</strong></summary>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Core concepts](#core-concepts)
  - [Folder structure](#folder-structure)
- [Requirements](#requirements)
- [Conventions](#conventions)
  - [Commits](#commits)
- [Workflow](#workflow)
  - [Filing issues](#filing-issues)
  - [Contributing to the code](#contributing-to-the-code)
  - [Releasing](#releasing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## Core concepts

The `github-repositories-archiver` CLI is inspired from the `algolia/create-instantsearch-app`.

### Folder structure

```
▸ src
  ▸ cli               The source code of the CLI `create-instantsearch-app`
  ▸ tasks             The tasks of the archiving lifecycle
▸ scripts             The end-to-end tests and release scripts
  CHANGELOG.md
  CONTRIBUTING.md
  LICENSE
  README.md
  index.js
  package.json
```

## Requirements

- [Node](https://nodejs.org) ≥ 8
- [Yarn](https://yarnpkg.com)

## Conventions

### Commits

This project follows the [conventional changelog](https://conventionalcommits.org/) approach. This means that all commit messages should be formatted using the following scheme:

```
type(scope): description
```

These commits are then used to generate the [changelog](CHANGELOG.md).

## Workflow

### Filing issues

Creating issues, either for reporting a bug or asking for a new feature is always great. [When doing so](https://github.com/algolia/github-repositories-archiver/issues/new/choose), you'll get asked what kind of issue you want to create. Each of these templates will help you create an effective report.

### Contributing to the code

Code contributions are always welcome, although you should make sure to [open an issue](https://github.com/algolia/github-repositories-archiver/issues/new/choose) to notice us what you plan to do.

You will need to follow these steps:

- [Fork the repository](https://help.github.com/articles/fork-a-repo/)
- Clone your fork
- Install the dependencies: `yarn`
- [Create a new branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/#creating-a-branch)
  - `fix/issue-number` for a fix
  - `feat/name-of-the-feature` for a feature
  - `docs/what-you-changed` for documentation
- Make your changes
- Run tests:
  - `yarn lint`
  - `yarn test`
- [Create a pull request](https://help.github.com/articles/creating-a-pull-request/)

We will then review your pull request!

### Releasing

We rely on [release-it](https://github.com/webpro/release-it) to release new versions of Create InstantSearch App.

#### Release flow

1.  Bump the project version in [`package.json`](package.json) based on [the commits](#conventions)
1.  Generate the changelog
1.  Commit the new release
1.  Create the new release tag
1.  Push to GitHub
1.  Create the new release on GitHub
1.  Publish to npm
1.  Push the generated templates to the [`templates`](https://github.com/algolia/create-instantsearch-app/tree/templates) branch (usable on CodeSandbox)

#### Release steps

To release a new version of the package, you need to:

1.  [Generate a new GitHub token](https://github.com/settings/tokens/new) with the scope `repo` (necessary for creating GitHub releases)
1.  Store this token in an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) called `GITHUB_TOKEN_CISA`
1.  Make sure you're on the `master` branch
1.  Run commands (_do not_ use `yarn` for releasing):
    - `npm run release:beta` for a new beta version
    - `npm run release` for a new stable version
1.  Follow the command-line instructions

---

Thank you for contributing!
