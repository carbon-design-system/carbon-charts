#!/usr/bin/env bash

set -e

rollup -c
tsc
cp *.md dist/
cp package.json dist/
cp -a src/styles/. dist/styles

sass --load-path ../../node_modules dist/styles/styles-white.scss dist/styles.css
sass --load-path ../../node_modules dist/styles/styles-white.scss dist/styles.min.css --style=compressed

sass --load-path ../../node_modules dist/styles/styles-g10.scss dist/styles-g10.css
sass --load-path ../../node_modules dist/styles/styles-g10.scss dist/styles-g10.min.css --style=compressed

sass --load-path ../../node_modules dist/styles/styles-g90.scss dist/styles-g90.css
sass --load-path ../../node_modules dist/styles/styles-g90.scss dist/styles-g90.min.css --style=compressed

sass --load-path ../../node_modules dist/styles/styles-g100.scss dist/styles-g100.css
sass --load-path ../../node_modules dist/styles/styles-g100.scss dist/styles-g100.min.css --style=compressed
