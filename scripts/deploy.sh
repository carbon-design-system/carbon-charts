#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

# Git user info configs
git config --global user.email "carbon@us.ibm.com"
git config --global user.name "carbon-bot"

# Add github token to git credentials
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

echo "Publish to Github..."

# Stash uncommitted changes
git stash

# Checkout master to get out of detached HEAD state
git checkout master

# Create release with lerna
npx lerna version --conventional-commits --yes --force-publish --create-release github

echo "Rebuild packages and demos.."
yarn build

# Add telemetry to packages
node scripts/add-telemetry-to-packages.cjs

# Authenticate with npm registry
npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

echo "Publish to NPM.."
npx lerna publish from-git --yes --force-publish --no-verify-access
