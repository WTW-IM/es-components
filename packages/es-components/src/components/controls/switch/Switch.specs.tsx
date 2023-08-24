import React from 'react';
import { screen } from '@testing-library/react';
import Switch from './Switch';
import { renderWithTheme } from '../../util/test-utils';

it('resynchronizes checked state', () => {
  const { rerender } = renderWithTheme(<Switch label="Test" checked={false} />);
  expect(screen.getByLabelText('Test')).not.toBeChecked();
  rerender(<Switch label="Test" checked={true} />);
  expect(screen.getByLabelText('Test')).toBeChecked();
});
