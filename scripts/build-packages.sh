#!/usr/bin/env bash

set -e

# README:
# each package should build a dist folder that contains everything needed to publish that package
# including:
#  - package.json
#  - .js files and .d.ts files (no raw .ts files!)
#  - README.md
#  - and any specialty files

# run the build and demo:build script in all packages
npx lerna run --stream build
