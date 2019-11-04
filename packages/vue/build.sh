#!/usr/bin/env bash

set -e

rm -rf dist

vue-cli-service build --target lib --name charts-vue ./src/index.js --no-clean
cp README.md dist/
cp package.json dist/
