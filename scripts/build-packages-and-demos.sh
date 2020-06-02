#!/usr/bin/env bash

set -e

# README:
# each package should build a dist folder that contains everything needed to publish that package
# including:
#  - package.json
#  - .js files and .d.ts files (no raw .ts files!)
#  - README.md
#  - and any specialty files

# Generate all assets needed for push to gh-pages
mkdir -p pages
touch pages/.nojekyll
# echo "charts.carbondesignsystem.com" > pages/CNAME


# run the build and demo:build script in all packages
lerna run --stream build
NODE_ENV=production lerna run --stream demo:build

# copy all the demos/{package name here} folders to the pages deploy directory
lerna exec -- \$LERNA_ROOT_PATH/scripts/copy-demos-to-deploy-dir.sh
