#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

npm run build-all

# Should remove once lerna stops mistakenly
# adding package-lock.json to every package after npm install
rm -rf **/package-lock.json

# checkout master to get out of detached HEAD state
git checkout master

lerna publish --conventional-commits --yes --github-release --contents dist
