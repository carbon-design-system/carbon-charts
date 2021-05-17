#!/usr/bin/env bash

set -e

cp -r ../../node_modules/@carbon/layout src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/elements src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/motion src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/type src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/themes src/styles/vendor/@carbon
cp -r ../../node_modules/@carbon/colors src/styles/vendor/@carbon
cp -r ../../node_modules/carbon-components src/styles/vendor

# plex
mkdir -p src/styles/vendor/plex
cp -r ../../node_modules/@ibm/plex/css src/styles/vendor/plex/css
cp -r ../../node_modules/@ibm/plex/LICENSE.txt src/styles/vendor/plex
cp -r ../../node_modules/@ibm/plex/package.json src/styles/vendor/plex
cp -r ../../node_modules/@ibm/plex/README.md src/styles/vendor/plex
cp -r ../../node_modules/@ibm/plex/CHANGELOG.md src/styles/vendor/plex
