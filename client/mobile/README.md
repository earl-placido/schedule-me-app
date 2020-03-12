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
* If you are using an emulator, use the following server endpoint:

  `http://10.0.2.2:8000/`
  
  * Note: This will connect your android emulator to your local web server.
 
* If you are using a physical device, use the following server endpoint:

  `http://<IP Address>:8000/`
  
  * Note:  The ip address you put MUST be the same as the one you are using for your laptop/computer and phone.  If your two devices are using a different ip address, you may not be able to connect to the local server.  
