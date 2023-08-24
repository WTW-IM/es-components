import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../util/test-utils';
import Banner from './Banner';

it('renders Banner', async () => {
  renderWithTheme(<Banner type="info">Banner Content</Banner>);
  expect(await screen.findByText('Banner Content')).toBeInTheDocument();
});

it('can take an extra className', async () => {
  renderWithTheme(
    <Banner type="success" className="my-success">
      Banner Content
    </Banner>
  );
  const banner = await screen.findByText('Banner Content');
  expect(banner).toBeInTheDocument();
  expect(banner).toHaveClass('my-success');
});

it('can take styles', async () => {
  renderWithTheme(
    <Banner type="success" style={{ color: 'blue' }}>
      Banner Content
    </Banner>
  );
  const banner = await screen.findByText('Banner Content');

  expect(banner).toBeInTheDocument();
  expect(banner).toHaveStyle('color: blue');
});
