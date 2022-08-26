if [ "$1" == "development" ];
then
  echo "Switching to Firebase development environment"
  yes | cp -rf "env/development/google-services.json" android/app
  yes | cp -rf "env/development/GoogleService-Info.plist" ios
  yes | cp -rf "env/development/credentials.js" src/commons/consts
elif [ "$1" == "production" ]
then
  echo "Switching to Firebase production environment"
  yes | cp -rf "env/production/google-services.json" android/app
  yes | cp -rf "env/production/GoogleService-Info.plist" ios
  yes | cp -rf "env/production/credentials.js" src/commons/consts
else
  echo "Run ‘appcenter-post-clone.sh envs’ to list available environments."
fi