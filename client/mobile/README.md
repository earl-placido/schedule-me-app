# To run on Android:

1. [Setup android environment for React Native CLI](https://facebook.github.io/react-native/docs/getting-started) 

2. `git clone https://github.com/Syndrical/scheduler-app.git`

3. `cd scheduler-app/client/mobile`

4. `npm install`

5. Create a `.env` file in the `client/mobile/` folder.  It must contain:

    ```
    REACT_APP_SERVER_ENDPOINT=<See Possible Server Endpoints>
    REACT_APP_GOOGLE_CLIENT_ID=<Client ID from Google API>
    ```
    
6. `npx react-native run-android`

###### See the [troubleshooting](troubleshooting.md) doc for common solutions to build errors. 



### What to put for the REACT_APP_SERVER_ENDPOINT variable:
* Normally, you could just use the following server endpoint:

  `http://schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/`

  * **Note**: This is our shared development server, so any changes you make will be visible to everyone.  If you want to use a local server, OR if you have made changes to the backend server that is not yet in our develop branch, you must use a different server endpoint. 

### Running our backend server locally:
* If you are using an emulator and want to run a local server, use the following server endpoint:

  `http://10.0.2.2:8000/`
  
  * **Note**: This should connect your android emulator to your local web server.

* If you are using a physical device and want to run a local server, use the following server endpoint:

  `http://<IP Address>:8000/`
  
  * **Note**:  The ip address you put MUST be the same as the one you are using for your computer and phone.  If your two devices are using different ip addresses, you may not be able to connect to the local server.  



# To assemble on Android:

1. In `scheduler-app/client/mobile` run: 

    `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

2. `cd android && ./gradlew assembleRelease -x bundleReleaseJsAndAssets`



# Tests

## Unit Tests

How to run:

​	`npm run test`

How to check the coverage:

​	`npm run test:coverage`



## System Tests

**These tests are made specifically for Android**

How to run:

1. Install the following:

    ```
    npm install -g appium
    npm install -g appium-doctor
    ```

    And make sure to do an `npm install`

    - Verify that all of Appium's dependencies are all set by running `appium-doctor --android`

      Should look like this in the end:

      ![](https://i.imgur.com/79VjRIX.png)

2. Run the app on your device (i.e. `npx react-native run-android`)

3. While in `client/mobile`, run: `npm run test:integration`