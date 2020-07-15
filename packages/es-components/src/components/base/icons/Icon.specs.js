/* eslint-env jest */

import React from 'react';
import { render } from '@testing-library/react';

import Icon from './Icon';

it('includes the aria-hidden attribute', () => {
  const { container } = render(<Icon name="federal" size={16} />);
  const hasAriaHiddenAttribute = container
    .querySelector('i')
    .getAttribute('aria-hidden');
  expect(Boolean(hasAriaHiddenAttribute)).toBe(true);
});
