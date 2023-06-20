#!/usr/bin/env bash

# This script is for working LOCALLY

set -e # exit with nonzero exit code if anything fails

git config --global user.email "carbon@us.ibm.com"
git config --global user.name "carbon-bot"
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

git stash
git checkout pr-1554
# As you might have an outdated local branch (and are not a CI)
git pull

npx lerna version prepatch --preid next --amend --force-publish

# For angular package, copies the version to dist/package.json
yarn build

npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

npx lerna publish from-package prepatch --force-publish --preid next --pre-dist-tag next
