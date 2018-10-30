/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Fieldset from './Fieldset';

it('renders legend when legendContent is provided', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Fieldset legendContent="I am legend">
        <div>Fieldset child</div>
      </Fieldset>
    </ThemeProvider>
  );

  expect(queryByText('I am legend')).not.toBeNull();
});
