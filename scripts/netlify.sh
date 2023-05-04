set -e

GREEN="\033[0;32m"
if [ $CONTEXT == "deploy-preview" ]; then
	echo -e "${GREEN}Deploying preview to Netlify for PR..."

	# Grab netlify app type from the netlify app URL
	# e.g. core, angular or react (translate to ./packages/NAME
	PKG_DIR=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	# Build core package first
	echo -e "${GREEN}Building @carbon/charts and demo dependencies (styles, data)..."
	npx lerna run build:package --scope=@carbon/charts --concurrency=1

	# Build package if not core and map APP_TYPE to PKG_DIR
	if [ "$PKG_DIR" != "core" ]; then
	  PKG="charts-$PKG_DIR"
		echo -e "${GREEN}Building @carbon/$PKG..."
		npx lerna run build:package --scope="@carbon/$PKG" --concurrency=1
  else
	  # Map package directory for core since name is different
	  PKG="charts"
	fi

	# Storybook build for selected package
  echo -e "${GREEN}Running storybook build for @carbon/$PKG..."
  npx lerna run build:demo --scope="@carbon/$PKG" --concurrency=1

	echo -e "${GREEN}Copying packages/$PKG_DIR/demo/bundle to pages/..."
	mkdir -p pages
	cp -a "packages/$PKG_DIR/demo/bundle/." pages
else
	echo -e "${GREEN}Not a PR... nothing to do."
fi
