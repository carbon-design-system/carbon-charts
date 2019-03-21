#!/usr/bin/env bash

set -e

babel src --out-dir dist
rollup -c
cp README.md dist/
cp package.json dist/
