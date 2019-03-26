# Netlify will run this anyways, this is to override the cache
npm i

./.travis/before_install.sh

# This script builds all demos for netlify
npm run build-all-demos
