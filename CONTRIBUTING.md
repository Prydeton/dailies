# Contributing to Dailies

## Creating Issues

If you find any bugs or have a feature request, please [create an issue](https://github.com/Prydeton/dailies/issues/new/choose).

## Local Development

This is a guide on getting Dailies working locally for development purposes. You should first follow this if you're thinking of making a [pull request](#pull-requests).

### Software

Dailies is written using Rust (for the backend) and React (for the frontend). Before you begin, you'll need to make sure you have the required software installed:

| Software | Installation instructions |
| --- | --- |
| git | You'll need git to clone the repository. You likely already have it if you're on MacOS, otherwise see the [git site](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). |
| node | I recommend using `nvm` or `fnm` to manage multiple node versions, but you can also install directly from the [node.js website](https://nodejs.org/en/download). |
| yarn | Node comes with `npm`, which you can use to run `npm install --global yarn` to install yarn. |
| rust | You can install rust by following the directions on the [rust website](https://www.rust-lang.org/tools/install). |

### Setup

1. Clone the repository.
2. Run `cargo run` in the `backend` folder to build and start the backend.
3. Run `yarn` in `frontend` folder to install dependencies, then `yarn dev` to start the dev server.

By default, the backend will start at http://localhost:3000, and the frontend will be available at http://localhost:5713.

## Pull Requests

Before starting a pull request, first check if there's an issue open that your pull request will resolve. If there isn't, please create one to give the community a chance to comment, and also to prevent others from working on similar pull requests that will conflict with yours.

Mention the issue you are closing at the top of your PR like so:
```
Closes #123

[describe your PR...]
```

## Git Branch Conventions

`main`
Production branch. Do not commit directly to this branch.

`feat/*`
Prefix new feature branches with feat. When complete, submit a PR into main.

`fix/*`
When fixing a bug, prefix branches with fix. When complete, submit a PR into main.

`refactor/*`
For refactoring code. When complete, submit a PR into main.

`chore/*`
For chores like adding type checking, setting up CI, fixing typos etc. When finished, submit a PR into main.

`docs/*`
Used when updating documentation such as README files. When finished, submit a PR into main.