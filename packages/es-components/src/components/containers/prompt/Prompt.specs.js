/* eslint-env jest */

import React from 'react';
import { cleanup } from 'react-testing-library';
import Prompt from './Prompt';
import { renderWithTheme } from '../../util/test-utils';

describe('Prompt', () => {
  afterEach(cleanup);

  it('renders read aloud type', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Prompt isContentReadAloud />
    );
    expect(getByText('Read Aloud')).not.toBeNull();
    expect(queryByText('Do Not Read Aloud')).toBeNull();
  });

  it('renders do not read aloud type', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Prompt isContentReadAloud={false} />
    );
    expect(getByText('Do Not Read Aloud')).not.toBeNull();
    expect(queryByText('Read Aloud')).toBeNull();
  });

  it('renders icon for "read aloud" type', () => {
    const { container } = renderWithTheme(<Prompt />);
    const hasAriaHiddenAttribute = container
      .querySelector('i')
      .getAttribute('aria-hidden');
    expect(Boolean(hasAriaHiddenAttribute)).toBe(true);
  });

  it('renders icon for "do not read aloud" type', () => {
    const { container } = renderWithTheme(
      <Prompt isContentReadAloud={false} />
    );
    const hasAriaHiddenAttribute = container
      .querySelector('i')
      .getAttribute('aria-hidden');
    expect(Boolean(hasAriaHiddenAttribute)).toBe(true);
  });

  it('renders children', () => {
    const { getByText } = renderWithTheme(
      <Prompt>
        <div>some stuff in here</div>
      </Prompt>
    );
    expect(getByText('some stuff in here')).not.toBeNull();
  });
});
