#!/bin/bash
set -e
#!/bin/bash

# Note: do not do set -x or the passwords will leak!

# @angular/cli should be removed when the angular dmeo project has been removed
npm install -g lerna@3.2.1 @storybook/cli @angular/cli rollup@0.67.3
