#!/usr/bin/env bash

set -e

GITHUB_UPSTREAM=git@github.com:carbon-design-system/carbon-charts.git

lerna run lint

if [ $? -ne 0 ]
then
	echo "Error: There were lint errors in the code, please review above and fix."
	exit 1
fi

# Refresh code
git pull upstream master

if [ $? -ne 0 ]
then
	echo "Error: Couldn't pull from upstream."
	echo "Try running 'git remote add upstream $GITHUB_UPSTREAM' and try again."
	exit 1
fi

if [ $? -ne 0 ]
then
	echo "There was an error running lerna bootstrap."
	exit 1
fi

# if package locks updated, add them
if [ ! -z "`git ls-files -m | grep package-lock.json`" ]
then
	git add package-lock.json ./packages/*/package-lock.json
	git commit -m "Update package-lock.json files"
fi

lerna run format

#exit 1  # stops push from running, good for testing
