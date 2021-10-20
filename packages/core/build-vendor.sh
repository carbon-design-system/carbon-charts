#!/usr/bin/env bash

set -e

cp -r ../../node_modules/@carbon/layout src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/elements src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/motion src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/type src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/themes src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/colors src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/styles src/styles/vendor/@carbon
cp -r ../../node_modules/carbon-components src/styles/vendor
