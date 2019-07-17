#!/usr/bin/env bash

set -e

webpack --config webpack.build.js
tsc
cp *.md dist/
cp package.json dist/
cp -a src/styles/. dist/styles
node-sass dist/style.scss > dist/styles/style.css
