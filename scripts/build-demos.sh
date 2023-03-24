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

# Run build:demo script in all packages in parallel
lerna run --stream build:demo

# Copy all demos/{package name here} folders to the pages deploy directory
lerna exec -- cp -a demo/bundle/. \$LERNA_ROOT_PATH/pages
