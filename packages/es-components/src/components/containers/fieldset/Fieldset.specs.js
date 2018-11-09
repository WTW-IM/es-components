/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';

import Fieldset from './Fieldset';

it('renders legend when legendContent is provided', () => {
  const { queryByText } = renderWithTheme(
    <Fieldset legendContent="I am legend">
      <div>Fieldset child</div>
    </Fieldset>
  );

  expect(queryByText('I am legend')).not.toBeNull();
});
