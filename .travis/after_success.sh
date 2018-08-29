#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not releasing"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  export RELEASE_GH_TOKEN=$GH_TOKEN

  # Need this in here currently because of
  # https://github.com/atlassian/cz-lerna-changelog/issues/16
  # Should remove as soon that issue is closed
  git stash
  git checkout master

  npm run semantic-release

  mkdir pages
  touch pages/.nojekyll
  echo "charts.carbondesignsystem.com" > pages/CNAME

  # bundle core demo
  cd packages/core
  npm run demo:build
  typedoc --out ./demo/bundle/documentation ./src/index.ts
  cp -a demo/bundle/. ../../pages

  cd ../angular/demo
  npm run build-storybook
  cp -a storybook-dist/. ../../../pages/angular
fi
