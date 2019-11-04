#!/usr/bin/env bash

set -e

if [ -d "../../node_modules/@carbon/layout" ]
then
	cp -r ../../node_modules/@carbon/layout src/styles/vendor/@carbon
	cp -r ../../node_modules/@carbon/motion src/styles/vendor/@carbon
	cp -r ../../node_modules/@carbon/type src/styles/vendor/@carbon
	cp -r ../../node_modules/@carbon/themes src/styles/vendor/@carbon
	cp -r ../../node_modules/@carbon/colors src/styles/vendor/@carbon
fi
