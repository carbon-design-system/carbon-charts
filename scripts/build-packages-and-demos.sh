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
echo "charts.carbondesignsystem.com" > pages/CNAME

# run the build:package then build:demo script in all packages
npx lerna run --stream build:package
NODE_ENV=production npx lerna run --stream build:demo

# copy all the demos/{package name here} folders to the pages deploy directory
npx lerna exec -- \$LERNA_ROOT_PATH/scripts/copy-demos-to-deploy-dir.sh
