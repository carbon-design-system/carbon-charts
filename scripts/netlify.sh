set -e

if [ $CONTEXT == "deploy-preview" ]; then
	echo "Deploying preview to Netlify for PR..."
	NODE_ENV=deploypreview

	# Grab netlify app type from the netlify app URL
	APP_TYPE=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	# APP_TYPE to packages/PKG_DIR
	# core -> charts
	# angular -> charts-angular
	# react -> charts-react
	# svelte -> charts-svelte
	# vue -> charts-vue

  # Build core package, demo and data
	lerna run build --env "$NODE_ENV" --scope=@carbon/charts

	# Build package and demo if not core
	if [ "$APP_TYPE" != "core" ]; then
	  PKG_DIR="charts-$APP_TYPE"
		lerna run build --env "$NODE_ENV" --scope="@carbon/$PKG_DIR"
  else
	  # Map package directory for core since name is different
	  PKG_DIR="charts"
	fi


	# Create folder we'll deploy to netlify
	mkdir -p pages

  # Copy demo bundle from package (even core) to pages
	cp -a "packages/$PKG_DIR/demo/bundle/." pages
else
	echo "Not a PR (do nothing)"
fi
