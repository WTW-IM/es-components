/* eslint-env jest */
/* eslint react/prop-types: 0 */
import React, { useEffect } from 'react';
import { screen } from '@testing-library/react';
import Switch from './Switch';
import { renderWithTheme } from '../../util/test-utils';

/*
 * Does not work for now. Something in the test lifecycle is unmounting the component after each render,
 * resulting in a false positive. Skipping this test for now until this can be fully investigated
 */
it.skip('resynchronizes checked state', () => {
  const { rerender } = renderWithTheme(<Switch label="Test" checked={false} />);
  expect(screen.getByLabelText('Test').checked).toBeFalsy();
  rerender(<Switch label="Test" checked={true} />);
  expect(screen.getByLabelText('Test').checked).toBeTruthy();
});
