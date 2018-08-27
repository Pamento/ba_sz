#!/bin/bash
#
# setup enviroment and build app for one platform and configuration
#
#
#
echo "choose platform between:android, ios, browser:"
read PLATFORM
if [ $PLATFORM != "android" ] &&  [ $PLATFORM != "ios" ]  &&  [ $PLATFORM != "browser" ]
then
    echo "unknown platform ${PLATFORM}"
    exit
fi
echo "setup env. for platform ${PLATFORM}"
echo "choose deploy:release, prod, dev"
read DEPLOY
if [ $DEPLOY != "release" ] &&  [ $DEPLOY != "prod" ]  &&  [ $DEPLOY != "dev" ]
then
    echo "unknown platform ${DEPLOY}";
    DEPLOYMODE="";
else
    if [ $DEPLOY == "release" ]
    then 
        DEPLOYMODE="--prod --release";
    else 
        DEPLOYMODE="--${DEPLOY}";
    fi
fi
echo "deploying:${DEPLOYMODE}";
rm -rf -r node_modules/
rm -rf plugins/
cordova platform rm ios 
cordova platform rm android 
cordova platform rm browser 
rm -rf platforms/
cd resources;
ln -sf icon_${PLATFORM}.png icon.png
cd ..
echo "project cleaned up"
npm install
cordova platform add ${PLATFORM} --nosave
ionic cordova resources

if [ $PLATFORM == "ios" ]
then
    echo "ios"
elif [ $PLATFORM == "android" ]
then
    echo "android"
    cp cer/android/* platforms/android/
fi
ionic cordova build ${PLATFORM} ${DEPLOYMODE};
