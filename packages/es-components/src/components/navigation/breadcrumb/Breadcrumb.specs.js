/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import Breadcrumb from './Breadcrumb';

it('renders as expected', () => {
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <Breadcrumb>
        <a href="/test">test</a>
        <a href="/test-2">test 2</a>
        <a href="/test-3">test 3</a>
      </Breadcrumb>
    </ThemeProvider>
  );

  expect(container).toMatchSnapshot();
});
