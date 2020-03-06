import React from 'react';
import { render } from '@testing-library/react';

import GroupList from '../../components/screens/GroupList/GroupList';

describe('GroupList', () => {
  test('renders group list snapshot', () => {
    render(<GroupList/>);
  });
});
