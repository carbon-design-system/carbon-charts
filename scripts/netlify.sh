./before_install.sh

if [ $CONTEXT == "deploy-preview" ]; then
	echo "We're in a PR preview"

	# Grab netlify app type from the netlify app URL
	# e.g. core, angular or react (translate to ./packages/NAME
	PKG_NAME=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	PKG_TO_BUILD="@carbon/$PKG_NAME"

	cd packages/charts
	yarn build
	cd ../..

	# create the folder we'll deploy in netlify
	mkdir -p pages

	# cd into the package directory
	cd packages/$PKG_NAME

	# run the build:demo script in all packages
	NODE_ENV=deploypreview yarn run build:demo

	# copy all the demo files to the pages deploy directory
	cp -a demo/bundle/. ../../pages
else
	echo "We're not in a PR preview, do nothing!"
fi
