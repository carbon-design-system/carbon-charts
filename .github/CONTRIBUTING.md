# Contributing to Charts

Yippee! If you're here, you _must_ be interested in contributing something to Charts.

If that's the case, we would like to personally thank you ahead of time 🤓❤️

Please take a moment to review this document in order to make the contribution process easy and
effective for everyone involved.

## Table of contents

- [IBMer Contributions](#IBMer-Contributions)
- **[Run Charts in Local Environment](#run-charts-in-local-environment)**
- [Issue guidelines](#issue-guidelines)
- [Pull request guidelines](#pull-request-guidelines)
  - [Contribution process](#contribution-process)
- [Code guidelines](#code-guidelines)
  - [Philosophy](#philosophy)
- [Legal](#legal)

## IBMer Contributions

**If you are an IBMer**, complete these steps, before contributing to any open source project:

1. Complete your [yearly training](https://ibm.biz/BdzGnB).
2. Map your identity using [IBM's GitHub mapper tool](https://gh-user-map.dal1a.cirrus.ibm.com/).
   This will generate an email and invite you to join the IBM org on Github.
3. Get your manager’s approval.

You can find out more at
[W3 Developer](https://w3.ibm.com/developer/docs/open-source/contributing/).

## Run Charts in Local Environment

We use Lerna to manage all `@carbon/charts` related packages.

**These are the Node and Yarn versions we recommend:**

- Node Version: `20.x`
- Yarn Version: `4.2.x`

To get charts running locally on your machine:

1. Fork this repo
2. Git clone your fork locally
3. Run `yarn install`
4. Run `yarn build` to build all packages and the documentation website

```sh
cd packages/docs
yarn dev
```

## Issue guidelines

- **Before submitting**, confirm the issue doesn't already exist by browsing through
  [existing issues](https://github.com/carbon-design-system/carbon-charts/issues). _Duplicates are
  just a waste of space._
- Keep issues **specific to one topic**. _Do not open an issue that describes multiple defects._
- Provide a **short descriptive title** that mentions the component being addressed.
- Provide enough of the **relevant information** below to initiate a clear issue description. Most
  of this content comes out-of-the-box as a template when
  [creating a new issue](https://github.com/carbon-design-system/carbon-charts/issues/new).
  - Type of issue
  - Version of charts
  - Description of the issue
  - Steps taken to produce the issue
  - Expected behavior
  - Current behavior
  - Screenshots or recording
  - Code snippets
  - Links to your application source code or running demo
    - Include any connection/authentication information we may need to view the links
- Add **relevant labels** (accessibility, bug, design, discussion, feature, etc.) to help organize
  and identify issues. For a complete list of our labels, see the
  [labels page](https://github.com/carbon-design-system/carbon-charts/labels).
- If you are interested in contributing, feel free to **assign the issue** to yourself, otherwise
  leave it unassigned.

## Pull request guidelines

- Before creating the pull request:

  - Update the "[Unreleased]" section of `CHANGELOG.md`.
  - Update the demo _as needed_.
  - Update the documentation _as needed_.
  - **Do not** change the version number.
  - Keep in mind there will be a **code review checklist** against the following requirements at
    time of review:

    | Requirement          | Description                                                                                                                                                                              |
    | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Demos all features   | All interactions spec'd out in the Design Guide has visual support and a demo as proof.                                                                                                  |
    | Documented/annotated | All rule blocks, placeholders, mixins, and functions has associated comment blocks that convey purpose and list inline notations referencing declarations that need further explanation. |
    | Matches UI/UX specs  | All features are pixel perfect when compared to the Design Guide.                                                                                                                        |

    All new code follows similar structure and style to the existing codebase giving off the
    impression that it was written by one developer. Accessible | All code passes the
    [Dynamic Assessment Plugin (DAP)](https://www.ibm.com/able/dynamic-assessment-plug-in.html) scan
    in Chrome. Mobile first | All visual elements are elegantly responsive. RTL support | All visual
    elements reflect bidirectional text appropriately. Performant | All Sass code is strategically
    written in a way to limit bloat in the compiled CSS.

- While creating the pull request:
  - Prepend "WIP: " to the title of your pull request if it is **not ready** to be merged.
  - Provide enough of the **relevant information** below to initiate a clear contribution
    description. Most of this content comes out-of-the-box as a template when
    [creating a pull request](https://github.com/carbon-design-system/carbon-charts/compare).
    1. A list of updates with references to the related issue (see:
       [Closing issues using keywords](https://help.github.com/articles/closing-issues-using-keywords/))
    2. Screenshots or recording
    3. @mention any key stakeholders that need to be aware of the changes
  - Add **relevant labels** (needs review, accessibility, bug, design, feature, etc.) to help
    organize and identify issues. For a complete list of our labels, see the
    [labels page](https://github.com/carbon-design-system/carbon-charts/labels)

### Contribution process

1. [Run the library locally](#run-charts-in-local-environment), then **configure the remotes** from
   your `charts/` directory:

   ```bash
   # Assign the original repo to a remote called "upstream"
   git remote add upstream git@github.com:carbon-design-system/carbon-charts.git
   ```

2. **Create a new topic branch** (off the original remote branch) to contain your code changes:

   ```bash
   git checkout -b <topic-branch-name> upstream/master
   ```

3. **Commit your changes in small logical chunks.** Refer to these
   [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   to maintain consistency.

   **To commit changes, please use `yarn run commit` rather than `git commit`**

4. If time passes between development, **locally merge (or rebase) the upstream master branch** into
   your topic branch to avoid conflicts in your pull request. We recommend using Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up a
   messy commit history.

   ```bash
   # Fetch and merge commits history
   git pull upstream master
   # Reapply one commit at a time
   git rebase --interactive upstream/master
   ```

5. Complete step 5 first, before **pushing your topic branch** up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

6. [Open a Pull Request](https://github.com/carbon-design-system/carbon-charts/compare) with a clear
   title and description from the template provided.

   - See
     [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)
     for step-by-step instructions.
   - Ensure the base branch is assigned to `master`.

## Code guidelines

### Philosophy

- Components should be fully equipped with _all_ features and interactions defined in the latest
  Design Guide and UX Specifications.
- Components should be _pixel perfect_ when compared to the latest Design Guide.

## Legal

Each source file must include a license header for the Apache Software License 2.0. Using the SPDX
format is the simplest approach. For example:

```javascript
/*
Copyright <holder> All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
```

We have tried to make it as easy as possible to make contributions. This applies to how we handle
the legal aspects of contribution. We use the same approach - the
[Developer's Certificate of Origin 1.1 (DCO)](https://developercertificate.org/) - that the Linux®
Kernel [community](https://elinux.org/Developer_Certificate_Of_Origin) uses to manage code
contributions.

We simply ask that when submitting a patch for review, the developer must include a sign-off
statement in the commit message.

Here is an example Signed-off-by line, which indicates that the submitter accepts the DCO:

```text
Signed-off-by: John Doe <john.doe@example.com>
```

You can include this automatically when you commit a change to your local git repository using the
following command:

```bash
git commit -s
```
