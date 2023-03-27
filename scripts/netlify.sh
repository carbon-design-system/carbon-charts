set -e

GREEN="\033[0;32m"
if [ $CONTEXT == "deploy-preview" ]; then
	echo -e "${GREEN}Deploying preview to Netlify for PR..."

	# Grab netlify app type from the netlify app URL
	APP_TYPE=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	# APP_TYPE to packages/PKG_DIR
	# core -> charts
	# angular -> charts-angular
	# react -> charts-react
	# svelte -> charts-svelte
	# vue -> charts-vue

	echo -e "${GREEN}Building @carbon/charts and demo dependencies (styles, data)..."
	lerna run build:package --scope=@carbon/charts --concurrency=1

	# Build package if not core and map APP_TYPE to PKG_DIR
	if [ "$APP_TYPE" != "core" ]; then
	  PKG_DIR="charts-$APP_TYPE"
		echo -e "${GREEN}Building @carbon/$PKG_DIR..."
		lerna run build:package --scope="@carbon/$PKG_DIR" --concurrency=1
  else
	  # Map package directory for core since name is different
	  PKG_DIR="charts"
	fi

  # Storybook build is too memory-intensive to run via lerna so do it old-school...
  echo -e "${GREEN}Running storybook build for @carbon/$PKG_DIR..."
	# cd "packages/$PKG_DIR"
	# yarn build:demo
	# cd ../..
  lerna run build:demo --scope="@carbon/$PKG_DIR" --concurrency=1

	echo -e "${GREEN}Copying packages/$PKG_DIR/demo/bundle to pages/..."
	mkdir -p pages
	cp -a "packages/$PKG_DIR/demo/bundle/." pages
else
	echo -e "${GREEN}Not a PR... nothing to do."
fi
