/* eslint-env jest */

import React from 'react';
import { cleanup } from '@testing-library/react';
import Spinner from './Spinner';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

it('does not include title when not provided', () => {
  renderWithTheme(<Spinner description="test spinner description" />);
  const title = screen.queryByText('Title');
  expect(title).toBeNull();
});

it('includes title when provided', () => {
  const { getByText } = renderWithTheme(<Spinner title="Test spinner" />);
  const title = getByText('Test spinner');
  expect(title).not.toBeNull();
});

it('does not include desc when not provided', () => {
  const { queryByText } = renderWithTheme(<Spinner title="Test spinner" />);
  expect(queryByText('test spinner description')).toBeNull();
});

it('includes desc when not provided', () => {
  const { getByText } = renderWithTheme(
    <Spinner description="test spinner description" />
  );
  const desc = getByText('test spinner description');
  expect(desc).not.toBeNull();
});
