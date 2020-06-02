#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

# Git user info configs
git config --global user.email "carbon@us.ibm.com"
git config --global user.name "carbon-bot"

# Add github token to git credentials
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

if [ -z "$TRAVIS_TAG" ]
then
	echo "The commit is not a tag, get lerna to version packages, and publish to Github."

	git stash

	# checkout master to get out of detached HEAD state
	git checkout master

	lerna version --conventional-commits --yes --force-publish
else
	echo "The commit is a tag, publish to NPM!"

	# authenticate with the npm registry
	npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

	node scripts/clean-package-jsons.js

	lerna publish from-git --yes --force-publish --contents dist
fi
