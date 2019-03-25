# Netlify will run this anyways, this is to override the cache
npm i

./.travis/before_install.sh

# This script builds all package bundles (for NPM) & demos (for gh-pages)
npm run build-all
