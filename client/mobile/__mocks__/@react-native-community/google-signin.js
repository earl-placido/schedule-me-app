import {NativeModules} from 'react-native';

jest.mock('@react-native-community/google-signin', () => {
  const mockGoogleSignin = require.requireActual(
    '@react-native-community/google-signin',
  );

  mockGoogleSignin.GoogleSignin.hasPlayServices = () => Promise.resolve(true);
  mockGoogleSignin.GoogleSignin.configure = () => Promise.resolve();
  mockGoogleSignin.GoogleSignin.currentUserAsync = () => {
    return Promise.resolve({
      name: 'name',
      email: 'test@example.com',
    });
  };

  return mockGoogleSignin;
});

NativeModules.RNGoogleSignin = {
  SIGN_IN_CANCELLED: '0',
  IN_PROGRESS: '1',
  PLAY_SERVICES_NOT_AVAILABLE: '2',
  SIGN_IN_REQUIRED: '3',
};

export {NativeModules};
