#!/usr/bin/env bash

set -e

GITHUB_UPSTREAM=git@github.com:carbon-design-system/carbon-charts.git

# Lint each package
npx lerna run lint

if [ $? -ne 0 ]
then
	echo "Error: There were lint errors in the code, please review above and fix."
	exit 1
fi

# Get latest code
git pull upstream master

if [ $? -ne 0 ]
then
	echo "Error: Couldn't pull from upstream."
	echo "Try running 'git remote add upstream $GITHUB_UPSTREAM' and try again."
	exit 1
fi

# Check to see if yarn.lock was modified since last commit and add it, if it was
if [ ! -z "`git ls-files -m | grep yarn.lock`" ]
then
	git add yarn.lock
	git commit -m "chore(monorepo): update yarn.lock"
fi

npx lerna run format

#exit 1  # stops push from running, good for testing
