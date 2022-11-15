/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';
import Banner from './Banner';

it('renders Banner', () => {
  const { queryByText } = renderWithTheme(<Banner>Banner Content</Banner>);
  expect(queryByText('Banner Content')).not.toBeNull();
});

it('can take textColor attribute', () => {
  const { container } = renderWithTheme(
    <Banner textColor="white">Text Color White</Banner>
  );
  const notificationDiv = container.querySelector('div');
  const styles = window.getComputedStyle(notificationDiv);
  expect(styles.color).toEqual('white');
});

it('can take bgColor attribute', () => {
  const { container } = renderWithTheme(
    <Banner bgColor="blue">Background Color</Banner>
  );
  const notificationDiv = container.querySelector('div');
  const styles = window.getComputedStyle(notificationDiv);
  expect(styles.backgroundColor).toEqual('blue');
});
