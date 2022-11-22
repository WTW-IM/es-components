/* eslint-env jest */

import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../util/test-utils';

import Fieldset from './Fieldset';

it('renders legend when legendContent is provided', () => {
  renderWithTheme(
    <Fieldset legendContent="I am legend">
      <div>Fieldset child</div>
    </Fieldset>
  );

  expect(screen.getByText('I am legend')).toBeInTheDocument();
});
