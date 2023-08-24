import React from 'react';
import { render, screen } from '@testing-library/react';

import Icon from './Icon';

it('includes the aria-hidden attribute', async () => {
  render(<Icon data-testid={`bds-icon-federal`} name="federal" size={16} />);
  const icon = await screen.findByTestId('bds-icon-federal');
  expect(icon).toHaveAttribute('aria-hidden');
});
