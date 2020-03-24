## To run on Android:

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

## What to put for the REACT_APP_SERVER_ENDPOINT variable:
* Normally, you could just use the following server endpoint:

  `http://schedule-me-up-dev.aufeskudeq.us-east-2.elasticbeanstalk.com/`

  * **Note**: This is our shared development server, so any changes you make will be visible to everyone.  If you want to use a local server, OR if you have made changes to the backend server that is not yet in our develop branch, you must use a different server endpoint. 

## Running our backend server locally:
* If you are using an emulator and want to run a local server, use the following server endpoint:

  `http://10.0.2.2:8000/`
  
  * **Note**: This should connect your android emulator to your local web server.
 
* If you are using a physical device and want to run a local server, use the following server endpoint:

  `http://<IP Address>:8000/`
  
  * **Note**:  The ip address you put MUST be the same as the one you are using for your computer and phone.  If your two devices are using different ip addresses, you may not be able to connect to the local server.  


  # Tests

  ## Unit Tests

  ## System Tests

- How to run on Android:

  1. Install the following:
      ```
      npm install -g appium 
      npm install -g appium-doctor
      npm install -g webdriverio
      ```
  2. Run the app on your device (i.e. `npx react-native run-android`)
  
  3. While in `client/mobile`, run: `(appium & wdio run wdio.conf.js)`

     - If appium takes too long to initialize, run `appium` in its own separate instance and run `wdio run wdio.conf.js` in another