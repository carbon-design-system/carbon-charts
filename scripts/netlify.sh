set -e

if [ $CONTEXT == "deploy-preview" ]; then
	echo "Deploying preview to Netlify for PR..."

	# Grab netlify app type from the netlify app URL
	APP_TYPE=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	# APP_TYPE to packages/PKG_DIR
	# core -> charts
	# angular -> charts-angular
	# react -> charts-react
	# svelte -> charts-svelte
	# vue -> charts-vue

	echo "Building @carbon/charts and demo dependencies (styles, data)..."
	NODE_ENV=deploypreview lerna run build:package --scope=@carbon/charts --concurrency=1

	# Build package if not core and map APP_TYPE to PKG_DIR
	if [ "$APP_TYPE" != "core" ]; then
	  PKG_DIR="charts-$APP_TYPE"
		echo "Building @carbon/$PKG_DIR..."
		NODE_ENV=deploypreview lerna run build:package --scope="@carbon/$PKG_DIR" --concurrency=1
  else
	  # Map package directory for core since name is different
	  PKG_DIR="charts"
	fi

  echo "Running storybook build for @carbon/$PKG_DIR..."
	NODE_ENV=deploypreview lerna run build:demo --scope="@carbon/$PKG_DIR" --concurrency=1

	echo "Copying packages/$PKG_DIR/demo/bundle to pages/..."
	mkdir -p pages
	cp -a "packages/$PKG_DIR/demo/bundle/." pages
else
	echo "Not a PR... nothing to do."
fi
