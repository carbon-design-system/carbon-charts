#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

rm -rf dist
# gulp build
webpack --config webpack.build.js
rm -rf dist/src dist/waste
gulp build:license

# npm run docs:build && mv documentation demo/bundle/
