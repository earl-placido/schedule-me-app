// jest.config.js
module.exports = {
  verbose: true,
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest/setup.js',
    '<rootDir>/__mocks__/@react-native-community/google-signin.js',
  ],
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  transformIgnorePatterns: ['/node_modules/(?!native-base)/'],
};
