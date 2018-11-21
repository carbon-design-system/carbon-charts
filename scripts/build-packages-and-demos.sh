# Generate all assets
# needed for push to gh-page
mkdir pages
touch pages/.nojekyll
echo "charts.carbondesignsystem.com" > pages/CNAME

# Build Core demos and copy to `pages` directory
cd packages/core
npm run build
npm run demo:build
typedoc --out ./demo/bundle/documentation ./src/index.ts
cp -a demo/bundle/. ../../pages

# Build Angular demos and copy to `pages` directory
cd ../angular/demo
npm run build-storybook
cp -a storybook-dist/. ../../../pages/angular
cd ..
rm -rf demo

# Build React demos
cd ../react
npm run build
npm run build-storybook
cp -a storybook-dist/. ../../pages/react

# Go back to project root folder
cd ../..
