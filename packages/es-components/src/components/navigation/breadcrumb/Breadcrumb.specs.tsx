import React from 'react';
import Breadcrumb from './Breadcrumb';
import { renderWithTheme } from '../../util/test-utils';
import { screen } from '@testing-library/react';

it('renders as expected', () => {
  const { container } = renderWithTheme(
    <Breadcrumb>
      <a href="/test">test</a>
      <a href="/test-2">test 2</a>
      <a href="/test-3">test 3</a>
    </Breadcrumb>
  );

  expect(container).toMatchSnapshot();
});

it('handles updates in fragment children', async () => {
  const { rerender } = renderWithTheme(
    <Breadcrumb>
      <a href="/test">test</a>
      <a href="/test-2">test 2</a>
      <>
        <a href="/test-3">test 3</a>
        <span>hello</span>
      </>
    </Breadcrumb>
  );

  expect(await screen.findByText('hello')).toBeInTheDocument();

  rerender(
    <Breadcrumb>
      <a href="/test">test</a>
      <a href="/test-2">test 2</a>
      <>
        <a href="/test-3">test 3</a>
        <span>hi</span>
      </>
    </Breadcrumb>
  );
  expect(await screen.findByText('hi')).toBeInTheDocument();
});
