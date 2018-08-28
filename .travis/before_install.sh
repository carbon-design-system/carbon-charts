#!/bin/bash
set -e
#!/bin/bash

# Note: do not do set -x or the passwords will leak!

npm install -g lerna@2.11.0 @storybook/cli lerna-semantic-release

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not setting up release"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q
fi
