# This script is triggered by `build-packages-and-demos.sh`
# And will copy the demo folder of a package (e.g. angular/demo/bundle)
# Into ($LERNA_ROOT_PATH/pages/angular)

DEST_DIR=`echo $LERNA_PACKAGE_NAME | sed s/"@carbon\/charts"// | sed s/"-"//`

cp -a demo/bundle/. $LERNA_ROOT_PATH/pages/$DEST_DIR
