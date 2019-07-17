#!/usr/bin/env bash

set -e

webpack --config webpack.build.js
tsc
cp *.md dist/
cp package.json dist/
cp src/styles/style.scss dist/style.scss
node-sass dist/style.scss > dist/style.css
