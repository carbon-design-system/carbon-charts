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

  git config credential.helper "store --file=.git/credentials"
  echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

  lerna publish --conventional-commits --yes

  mkdir pages
  touch pages/.nojekyll
  echo "charts.carbondesignsystem.com" > pages/CNAME

  # bundle core demo
  cd packages/core
  npm run build
  npm run demo:build
  typedoc --out ./demo/bundle/documentation ./src/index.ts
  cp -a demo/bundle/. ../../pages

  cd ../angular/demo
  npm run build-storybook
  cp -a storybook-dist/. ../../../pages/angular
fi
