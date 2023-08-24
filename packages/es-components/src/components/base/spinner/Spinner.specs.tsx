import React from 'react';
import { screen } from '@testing-library/react';
import Spinner from './Spinner';
import { renderWithTheme } from '../../util/test-utils';

it('does not include title when not provided', () => {
  renderWithTheme(<Spinner description="test spinner description" />);
  expect(screen.queryByText('Title')).toBeNull();
});

it('includes title when provided', async () => {
  renderWithTheme(<Spinner title="Test spinner" />);
  const title = await screen.findByText('Test spinner');
  expect(title).toBeInTheDocument();
});

it('does not include desc when not provided', () => {
  renderWithTheme(<Spinner title="Test spinner" />);
  expect(screen.queryByText('test spinner description')).toBeNull();
});

it('includes desc when not provided', async () => {
  renderWithTheme(<Spinner description="test spinner description" />);
  const desc = await screen.findByText('test spinner description');
  expect(desc).toBeInTheDocument();
});
