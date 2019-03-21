# README:
# each package should build a dist folder that contains everything needed to publish that package
# including:
#  - package.json
#  - .js files and .d.ts files (no raw .ts files!)
#  - README.md
#  - and any specialty files

# Generate all assets needed for push to gh-pages
mkdir pages
touch pages/.nojekyll
# echo "charts.carbondesignsystem.com" > pages/CNAME

# Core build
cd packages/core
npm run build
npm run demo:build
typedoc --out ./demo/bundle/documentation ./src/index.ts
cp -a demo/bundle/. ../../pages

# Angular build
cd ../angular
npm run build
npm run build-storybook
cp -a storybook-dist/. ../../pages/angular

# React build
cd ../react
npm run build
npm run build-storybook
cp -a storybook-dist/. ../../pages/react

# Vue build
cd ../vue
npm run build
npm run build-storybook
cp -a storybook-dist/. ../../pages/vue

# Go back to project root folder
cd ../..
