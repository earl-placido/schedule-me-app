import React from 'react';
import { render } from '@testing-library/react';

import GroupDetail from '../../components/screens/GroupDetail/GroupDetail';

describe('GroupDetail', () => {
  test('renders group detail snapshot', () => {
    render(<GroupDetail/>);
  });
});
