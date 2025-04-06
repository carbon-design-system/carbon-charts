#!/bin/bash

# Read the contents of typedoc.customFooter.html into a variable
custom_footer=$(<./typedoc.customFooter.html)

# Run TypeDoc with the custom footer HTML
typedoc --customFooterHtml "$custom_footer" \
    --customFooterHtmlDisableWrapper \
    --tsconfig ../core/tsconfig.json \
    ../core/src/index.ts \
    --out ../../pages/api \
    --hideGenerator