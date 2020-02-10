#!/usr/bin/env bash

set -e

# clean dist
rm -rf dist

echo "compiling ts to js"
tsc -p tsconfig-build.json
# manually update the symlink before building the demo output
rm -f ../../node_modules/@carbon/charts
ln -sf $(pwd)/dist ../../node_modules/@carbon/charts
tsc -p tsconfig-demo.json

echo "bundling..."
rollup -c
rollup -c rollup.demo.js

echo "copying metadata"
cp *.md dist/
cp package.json dist/

echo "building styles"
cp -a src/styles/. dist/styles
sass --load-path ../../node_modules dist/styles/styles-white.scss dist/styles.css
sass --load-path ../../node_modules dist/styles/styles-white.scss dist/styles.min.css --style=compressed

sass --load-path ../../node_modules dist/styles/styles-g10.scss dist/styles-g10.css
sass --load-path ../../node_modules dist/styles/styles-g10.scss dist/styles-g10.min.css --style=compressed

sass --load-path ../../node_modules dist/styles/styles-g90.scss dist/styles-g90.css
sass --load-path ../../node_modules dist/styles/styles-g90.scss dist/styles-g90.min.css --style=compressed

sass --load-path ../../node_modules dist/styles/styles-g100.scss dist/styles-g100.css
sass --load-path ../../node_modules dist/styles/styles-g100.scss dist/styles-g100.min.css --style=compressed

echo "linking local packages"
yarn lerna link --force-local
# also manually update the symlink ... lerna does a terrible job at this
rm -f ../../node_modules/@carbon/charts
ln -sf $(pwd)/dist ../../node_modules/@carbon/charts
