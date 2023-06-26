#!/usr/bin/env bash

# This script is for working LOCALLY. Allow it to commit to pr-1554 so the version increments properly.

set -e # exit with nonzero exit code if anything fails

git config --global user.email "carbon@us.ibm.com"
git config --global user.name "carbon-bot"
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

# Get git into the right state, ensure local branch is up-to-date
git stash
git checkout issue-1579
git pull

# Use latest dependencies
yarn install

# At this point, there could be a new yarn.lock (install-state.gz is now gitignored)
git add yarn.lock
git commit --allow-empty -m "chore(repo): yarn lock preventative commit"

# Create next prerelease version (1.11.0-next.0, etc.)
npx lerna version prerelease --preid next --force-publish

# For angular package, copies the version to dist/package.json using ng-packagr
yarn build

# Should not be needed
# node scripts/update-angular-dependency-version.cjs

npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

# Lerna is supposed to support yarn workspaces and replace "workspace:*" in dist/package.json with current version
npx lerna publish from-package --pre-dist-tag next --force-publish
