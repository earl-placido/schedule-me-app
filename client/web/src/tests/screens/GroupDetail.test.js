import React from 'react';
import { render } from '@testing-library/react';

import GroupDetail from '../../components/screens/GroupDetail/GroupDetail';

describe('GroupInfoForm', () => {
  test('renders group info form snapshot', () => {
    render(<GroupDetail/>);
  });
});
