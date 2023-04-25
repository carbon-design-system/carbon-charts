#!/usr/bin/env bash

# Bail out at first sign of trouble
set -e

GITHUB_UPSTREAM=git@github.com:carbon-design-system/carbon-charts.git

# Lint each package
npx lerna run lint

if [ $? -ne 0 ]
then
	echo "Error [lint]: Review the output above and fix the errors in the code."
	exit 1
fi

# Get latest code
git pull upstream master

if [ $? -ne 0 ]
then
	echo "Error [git pull upstream master]: Try running 'git remote add upstream $GITHUB_UPSTREAM' and try again."
	exit 1
fi

# Check to see if yarn.lock was modified since last commit and add it, if it was
if [ ! -z "`git ls-files -m | grep yarn.lock`" ]
then
	git add yarn.lock
	git commit -m "chore(monorepo): update yarn.lock"
fi

# Run prettier on each package applying prettier-config-carbon
npx lerna run format

#exit 1  # stops push from running, good for testing
