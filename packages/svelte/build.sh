#!/usr/bin/env bash

set -e

rm -rf dist

echo "linking local packages (non-lerna)"
# we run this outside of lerna, since lerna seems to have issues with correctly linking to the dist
rm -f node_modules/@carbon/charts
ln -sf $(pwd)/../core/dist node_modules/@carbon/charts

echo "bundling..."
rollup -c

# copy src directory for Svelte entry
cp -r src/ dist/src

# copy types directory
cp -r types/ dist/types

echo "copying metadata"
cp *.md dist/
cp package.json dist/
