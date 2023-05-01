#!/usr/bin/env bash

set -e

# README:
# each package should build a dist folder that contains everything needed to publish that package
# including:
#  - package.json
#  - .js files and .d.ts files (no raw .ts files!)
#  - README.md
#  - and any specialty files

# Run build:demo script in all packages in parallel
npx lerna run --stream build:demo

# Setup empty pages directory for storybook builds
rm -rf pages
mkdir -p pages
touch pages/.nojekyll
echo "charts.carbondesignsystem.com" > pages/CNAME

# Copy demos/{package name here} folders to the pages deploy directory
npx lerna exec -- cp -a demo/bundle/. \$LERNA_ROOT_PATH/pages
