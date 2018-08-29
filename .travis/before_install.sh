#!/bin/bash
set -e
#!/bin/bash

# Note: do not do set -x or the passwords will leak!

npm install -g lerna@3.2.1 @storybook/cli

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not setting up release"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q
fi
