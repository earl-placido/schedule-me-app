# Troubleshooting 

## Common solutions to build errors on Android

1. Delete the `client/mobile/node_modules` folder and everything in it, then run `npm install` in the `client/mobile` folder
2. `cd client/mobile/android` & `./gradlew clean`
3. Make sure any prior version of the app is completely uninstalled from your device/emulator. You may need to go into Settings>Apps>schedule-me-up and "Uninstall for all users"
