# Netlify will run this anyways, this is to override the cache
yarn --offline

./.travis/before_install.sh

# This script builds all demos for netlify
yarn run build-all-demos
