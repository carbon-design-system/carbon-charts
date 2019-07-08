#!/usr/bin/env bash

set -e

webpack --config webpack.build.js
tsc
cp *.md dist/
cp package.json dist/
cp src/style.scss dist/style.scss
cp src/themes dist/themes
node-sass dist/style.scss > dist/style.css
