#!/usr/bin/env bash

set -e

rm -rf dist
webpack --config webpack.build.js
tsc
cp *.md dist/
cp package.json dist/
cp src/style.scss dist/style.scss
node-sass dist/style.scss > dist/style.css
