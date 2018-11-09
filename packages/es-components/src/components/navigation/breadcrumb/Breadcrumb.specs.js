/* eslint-env jest */

import React from 'react';
import Breadcrumb from './Breadcrumb';
import { renderWithTheme } from '../../util/test-utils';

it('renders as expected', () => {
  const { container } = renderWithTheme(
    <Breadcrumb>
      <a href="/test">test</a>
      <a href="/test-2">test 2</a>
      <a href="/test-3">test 3</a>
    </Breadcrumb>
  );

  expect(container).toMatchSnapshot();
});
