import React from 'react';
import { render } from '@testing-library/react';

import GroupInfoForm from '../../../../components/groups/GroupInfoForm';



describe('GroupInfoForm', () => {
  test('renders group info form snapshot', () => {
    render(<GroupInfoForm/>);

  });
});
