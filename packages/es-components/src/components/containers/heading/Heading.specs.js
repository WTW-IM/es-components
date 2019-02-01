/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';

import Heading from './Heading';

it('renders proper heading level', () => {
  const { queryByText } = renderWithTheme(
    <Heading level={1}>Heading level 1</Heading>
  );

  expect(queryByText('Heading level 1')).not.toBeNull();
});

it('renders heading level with another size', () => {
  const { container } = renderWithTheme(
    <div>
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={3} size={1}>
        Heading level 3 size 1
      </Heading>
    </div>
  );

  expect(container).toMatchSnapshot();
});
