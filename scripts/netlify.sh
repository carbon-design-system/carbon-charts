./before_install.sh

if [ $CONTEXT == "deploy-preview" ]; then
	echo "We're in a PR preview"

	# Grab netlify app type from the netlify app URL
	# e.g. core, angular or react (translate to ./packages/NAME
	PKG_NAME=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	if [ $PKG_NAME == "core" ]; then
		PKG_TO_BUILD="@carbon/charts"
	else
		PKG_TO_BUILD="@carbon/charts-$PKG_NAME"
	fi

	cd packages/core
	yarn build
	cd ../..

	# create the folder we'll deploy in netlify
	mkdir -p pages

	# cd into the package directory
	cd packages/$PKG_NAME

	# run the demo:build script in all packages
	NODE_ENV=deploypreview yarn run demo:build

	# copy all the demo files to the pages deploy directory
	cp -a demo/bundle/. ../../pages
else
	echo "We're not in a PR preview, do nothing!"
fi
