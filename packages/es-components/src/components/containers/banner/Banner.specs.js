/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';
import ForwardedBanner from './Banner';

it('renders Banner', () => {
  const { queryByText } = renderWithTheme(
    <ForwardedBanner type="info">Banner Content</ForwardedBanner>
  );
  expect(queryByText('Banner Content')).not.toBeNull();
});

it('can take an extra className', () => {
  const { container } = renderWithTheme(
    <ForwardedBanner type="success" className="my-success" />
  );
  expect(container.querySelector('.my-success')).not.toBeNull();
});

it('can take styles', () => {
  const { container } = renderWithTheme(
    <ForwardedBanner type="success" style={{ color: 'blue' }} />
  );
  const notificationDiv = container.querySelector('div');
  const styles = window.getComputedStyle(notificationDiv);
  expect(styles.color).toEqual('blue');
});
