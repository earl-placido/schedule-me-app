/**
 * @format
 */

import 'react-native';
import React from 'react';
import Root from '../index.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);

jest.useFakeTimers();

it('renders correctly', () => {
  renderer.create(<Root />);
});
