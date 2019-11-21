# Contributing to Charts

Yippee! If you're here, you _must_ be interested in contributing something to Charts.

If that's the case, we would like to personally thank you ahead of time 🤓❤️

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

## Table of contents

- **[Run Charts in Local Environment](#run-charts-in-local-environment)**
- [Issue guidelines](#issue-guidelines)
- [Pull request guidelines](#pull-request-guidelines)
  - [Contribution process](#contribution-process)
- [Code guidelines](#code-guidelines)
  - [Philosophy](#philosophy)


## Run Charts in Local Environment
We use Lerna to manage all packages in Charts.

**These are the Node & NPM versions we recommend:**
- Node Version: `8.11.4`
- NPM Version: `6.4.1`

To get charts running locally on your machine:
1. Fork this repo
2. Clone your fork
3. Run `yarn` (this would install all packages and get **lerna** setup)

The **core** package (vanilla JS) demos can be launched using:

```sh
yarn run demo:server
```

All wrapper packages (currently **react** & **angular**) use Storybook for demos:

```sh
yarn run storybook
```

## Issue guidelines

- **Before submitting**, confirm the issue doesn't already exist by browsing through [existing issues](https://github.com/IBM/sterling-dataviz/issues). _Duplicates are just a waste of space._
- Keep issues **specific to one topic**. _Do not open an issue that describes multiple defects._
- Provide a **short descriptive title** that mentions the component being addressed.
- Provide enough of the **relevant information** below to initiate a clear issue description. Most of this content comes out-of-the-box as a template when [creating a new issue](https://github.com/IBM/sterling-dataviz/issues/new).
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
- Add **relevant labels** (accessibility, bug, design, discussion, feature, etc.) to help organize and identify issues. For a complete list of our labels, see the [labels page](https://github.com/IBM/sterling-dataviz/labels).
- If you are interested in contributing, feel free to **assign the issue** to yourself, otherwise leave it unassigned.

## Pull request guidelines

- Before creating the pull request:
  - Update the "[Unreleased]" section of `CHANGELOG.md`.
  - Update the demo _as needed_.
  - Update the documentation _as needed_.
  - **Do not** change the version number.
  - Keep in mind there will be a **code review checklist** against the following requirements at time of review:

    Requirement | Description
    ----------- | -----------
    Demos all features | All interactions spec'd out in the Design Guide has visual support and a demo as proof.
    Documented/annotated | All rule blocks, placeholders, mixins, and functions has associated comment blocks that convey purpose and list inline notations referencing declarations that need further explanation.
    Matches UI/UX specs | All features are pixel perfect when compared to the Design Guide.
    All new code follows similar structure and style to the existing codebase giving off the impression that it was written by one developer.
    Accessible | All code passes the [Dynamic Assessment Plugin (DAP)](https://www.ibm.com/able/dynamic-assessment-plug-in.html) scan in Chrome.
    Mobile first | All visual elements are elegantly responsive.
    RTL support | All visual elements reflect bidirectional text appropriately.
    Performant | All Sass code is strategically written in a way to limit bloat in the compiled CSS.

- While creating the pull request:
  - Prepend "WIP: " to the title of your pull request if it is **not ready** to be merged.
  - Provide enough of the **relevant information** below to initiate a clear contribution description. Most of this content comes out-of-the-box as a template when [creating a pull request](https://github.com/IBM/sterling-dataviz/compare).
    1. A list of updates with references to the related issue (see: [Closing issues using keywords](https://help.github.com/articles/closing-issues-using-keywords/))
    2. Screenshots or recording
    3. @mention any key stakeholders that need to be aware of the changes
  - Add **relevant labels** (needs review, accessibility, bug, design, feature, etc.) to help organize and identify issues. For a complete list of our labels, see the [labels page](https://github.com/IBM/sterling-dataviz/labels)

### Contribution process

1. [Run Charts locally](https://github.com/IBM/sterling-dataviz/blob/master/README.md#run-charts-locally), then **configure the remotes** from your `charts/` directory:

   ```bash
   # Assign the original repo to a remote called "upstream"
   git remote add upstream git@github.com:IBM/sterling-dataviz.git
   ```

2. **Create a new topic branch** (off the original remote branch) to contain your code changes:

   ```bash
   git checkout -b <topic-branch-name> upstream/master
   ```

3. **Commit your changes in small logical chunks.** Refer to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   to maintain consistency.
   
	**To commit changes, please use `yarn run commit` rather than `git commit`**

4. If time passes between development, **locally merge (or rebase) the upstream master branch** into your topic branch to avoid conflicts in your pull request. We recommend using Git's [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up a messy commit history.

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

6. [Open a Pull Request](https://github.com/IBM/sterling-dataviz/compare) with a clear title and description from the template provided.

    - See [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) for step-by-step instructions.
    - Ensure the base branch is assigned to `master`.

## Code guidelines
### Philosophy

- Components should be fully equipped with _all_ features and interactions defined in the latest Design Guide and UX Specifications.
- Components should be _pixel perfect_ when compared to the latest Design Guide.
