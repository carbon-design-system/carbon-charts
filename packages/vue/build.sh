#!/usr/bin/env bash

set -e

rm -rf dist

echo "linking local packages (non-lerna)"
# we run this outside of lerna, since lerna seems to have issues with correctly linking to the dist
rm -f node_modules/@carbon/charts
ln -sf $(pwd)/../core/dist node_modules/@carbon/charts

echo "building with vue-cli"
vue-cli-service build --target lib --name charts-vue ./src/index.js --no-clean

echo "copying metadata"
cp *.md dist/
cp package.json dist/
