set -e

# Generates the preview for @carbon/charts (core), @carbon/charts-react and @carbon/charts-angular
#
# The Netlify URL (https://carbon-charts-core.netlify.app, https://carbon-charts-react.netlify.app, etc.)
# is passed to this script and CONTEXT (deploy-preview or something else).
# If the context is "deploy-preview", the core package is built (as it's a dependency for all packages).
# Next, if the URL is for @carbon/charts-react or @carbon/charts-angular, then one of those packages are built.
# After that, the test page for the appropriate package is built.

GREEN="\033[0;32m"

if [[ "$SITE_NAME" == "carbon-charts-docs" ]]; then
	  echo -e "Deploying docs site"

		# Build core package first
		echo -e "${GREEN}Building @carbon/charts and styles..."
		npx lerna run build --scope=@carbon/charts --concurrency=1

		# Build react package
		echo -e "${GREEN}Building @carbon/charts-react and styles..."
		npx lerna run build --scope=@carbon/charts-react --concurrency=1
	
		# Build docs package
		echo -e "${GREEN}Building @carbon/charts-docs and styles..."
		npx lerna run build --scope=@carbon/charts-docs --concurrency=1

		# Build Netlify functions for SSR
    echo -e "${GREEN}Building Netlify functions for SSR..."
    npx netlify-lambda build packages/docs/netlify/functions
else
	if [ $CONTEXT == "deploy-preview" ]; then
		# Netlify URL examples: https://carbon-charts-core.netlify.app, https://carbon-charts-react.netlify.app, etc.
		# The URL drives which test site to 
		echo -e "${GREEN}Deploying test page to ${URL} on Netlify for pull request..."
	
		# Grab netlify app type from the netlify app URL
		# e.g. core, angular or react (translate to ./packages/NAME)
		PKG_DIR=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`
	
		# Build core package first
		echo -e "${GREEN}Building @carbon/charts and styles..."
		npx lerna run build --scope=@carbon/charts --concurrency=1
	
		# Build package if not core (angular or react) and map APP_TYPE to PKG_DIR
		if [ "$PKG_DIR" != "core" ]; then
			PKG="charts-$PKG_DIR"
			echo -e "${GREEN}Building @carbon/$PKG..."
			npx lerna run build --scope="@carbon/$PKG" --concurrency=1
		else
			# Map package directory for core since name is different
			PKG="charts"
		fi
	
		echo -e "${GREEN}Creating test page for @carbon/$PKG..."
		npx lerna run build:test --scope="@carbon/$PKG" --concurrency=1
	else
		echo -e "${GREEN}Not a PR... nothing to do."
	fi
fi
