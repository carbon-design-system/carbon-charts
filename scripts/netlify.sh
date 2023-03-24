set -e

if [ $CONTEXT == "deploy-preview" ]; then
	echo "We're in a PR preview"

	# Grab netlify app type from the netlify app URL
	APP_TYPE=`echo $URL | sed s/"https:\/\/carbon-charts-"// | sed s/"\..*"//`

	# Mappings from APP_TYPE to directory names in packages/
	# core -> charts
	# angular -> charts-angular
	# react -> charts-react
	# svelte -> charts-svelte
	# vue -> charts-vue

  # Build core package, demo and demo data
	lerna run build --scope=@carbon/charts

	# Build package and demo if not core
	if [ "$APP_TYPE" != "core" ]; then
	  PKG_DIR="charts-$APP_TYPE"
		lerna run build --scope="@carbon/$PKG_DIR"
  else
	  # Map package directory for core since name is different
	  PKG_DIR="charts"
	fi

	# Create folder we'll deploy to netlify
	mkdir -p pages

  # Copy demo bundle from package (even core) to pages
	cp -a "packages/$PKG_DIR/demo/bundle/." pages
else
	echo "We're not in a PR preview, do nothing!"
fi
