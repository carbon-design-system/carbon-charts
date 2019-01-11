#!/bin/bash
set -e

npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not releasing. Run unit tests:"

  # Run tests
  cd packages/core
  npm run test
  cd ../..

  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  # Should remove once lerna stops mistakenly
  # adding package-lock.json to every package after npm install
  git status
  git stash
  git checkout master

  # Git user info configs
  git config --global user.email "carbon@us.ibm.com"
  git config --global user.name "carbon-bot"

  # Add github token to git credentials
  git config credential.helper "store --file=.git/credentials"
  echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

  # Run tests
  cd packages/core
  npm run test
  cd ../..

  # This script builds all package bundles (for NPM) & demos (for gh-pages)
  ./scripts/build-packages-and-demos.sh
  
  # Perform git & npm publish
  git update-index --assume-unchanged `git diff --name-only`

  lerna publish --conventional-commits --yes
fi

if [[ echo $TRAVIS_BRANCH | grep "^v[0-9]\+\.[0-9]\+\.[0-9]\+\$" ]]; then
  lerna publish from-git
fi
