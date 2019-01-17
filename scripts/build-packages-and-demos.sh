# Generate all assets
# needed for push to gh-page
mkdir pages
touch pages/.nojekyll
# echo "charts.carbondesignsystem.com" > pages/CNAME

# Build Core demos and copy to `pages` directory
cd packages/core
npm run build
npm run demo:build
typedoc --out ./demo/bundle/documentation ./src/index.ts
cp -a demo/bundle/. ../../pages

# Build Angular demos and copy to `pages` directory
cd ../angular
# Build angular demos
npm run build-storybook
cp -a storybook-dist/. ../../pages/angular
# Build angular bundle for release
npm run build
mv dist ../charts-angular-dist
cd ..
rm -rf angular
mv charts-angular-dist angular

# Build React demos
cd react
npm run build
npm run build-storybook
cp -a storybook-dist/. ../../pages/react

# Go back to project root folder
cd ../..
