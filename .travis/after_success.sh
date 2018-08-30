#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not releasing"
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

  lerna publish --conventional-commits --yes

  # Generate all assets
  # needed for push to gh-page
  mkdir pages
  touch pages/.nojekyll
  echo "charts.carbondesignsystem.com" > pages/CNAME

  cd packages/core
  npm run build
  npm run demo:build
  typedoc --out ./demo/bundle/documentation ./src/index.ts
  cp -a demo/bundle/. ../../pages

  cd ../angular/demo
  npm run build-storybook
  cp -a storybook-dist/. ../../../pages/angular
fi

if [[ echo $TRAVIS_BRANCH | grep "^v[0-9]\+\.[0-9]\+\.[0-9]\+\$" ]]; then
  npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

  lerna publish from-git
fi
