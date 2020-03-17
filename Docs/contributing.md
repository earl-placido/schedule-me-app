# Contributing/Version Control System

We use a **mono-repo** (one repository containing all projects).

We are using a modified of git flow (which could also be considered a modified version of GitHub flow).

- Release branch: `master` *
  - protected branch; must create a pull request (PR) from develop and be approved by at least 3 developers
- Development branch: `develop`
  - stable versions of develop can be merged into master
  - protected branch; must create a PR and be approved by at least 3 developers
- Hotfix: 
  - quick patch 
  - based on `master`
  - quickly merged into `master` and `develop`
- Other branches:
  - each change that can be individually packaged can reside on its own branch 
  - based on `develop` or another branch that is relevant and is based off of `develop`
  - a pull request is required to merge into `develop`
    - requires 3 approvals by `CODE_OWNERS` (automatically requested upon creating a PR using GitHub)
    - a code review and PR template is automatically added when creating a pull request



###### *Note: as we build the app we have released to master not fully functioning versions of the project. For an initial stage, this should be fine - once an earliest usable version is ready, the release branch should exclusively present a usable app.

