/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';
import Banner from './Banner';

it('renders Banner', () => {
  const { queryByText } = renderWithTheme(
    <Banner type="info">Banner Content</Banner>
  );
  expect(queryByText('Banner Content')).not.toBeNull();
});

it('can take an extra className', () => {
  const { container } = renderWithTheme(
    <Banner type="success" className="my-success" />
  );
  expect(container.querySelector('.my-success')).not.toBeNull();
});

it('can take styles', () => {
  const { container } = renderWithTheme(
    <Banner type="success" style={{ color: 'blue' }} />
  );
  const notificationDiv = container.querySelector('div');
  const styles = window.getComputedStyle(notificationDiv);
  expect(styles.color).toEqual('blue');
});
