/// <reference types="jest">

import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import Prompt from './Prompt';
import { renderWithTheme } from '../../util/test-utils';

describe('Prompt', () => {
  afterEach(cleanup);

  it('renders read aloud type', () => {
    renderWithTheme(<Prompt isContentReadAloud />);
    expect(screen.getByText('Read Aloud')).not.toBeNull();
    expect(screen.queryByText('Do Not Read Aloud')).toBeNull();
  });

  it('renders do not read aloud type', () => {
    renderWithTheme(<Prompt isContentReadAloud={false} />);
    expect(screen.getByText('Do Not Read Aloud')).not.toBeNull();
    expect(screen.queryByText('Read Aloud')).toBeNull();
  });

  it('renders icon for "read aloud" type', () => {
    renderWithTheme(<Prompt />);
    const hasIcon = screen
      .queryByText('Read Aloud')
      // eslint-disable-next-line testing-library/no-node-access
      ?.parentElement?.querySelector('i');
    const hasAriaHiddenAttribute = hasIcon
      ? hasIcon.getAttribute('aria-hidden')
      : false;
    expect(Boolean(hasAriaHiddenAttribute)).toBe(true);
  });

  it('renders icon for "do not read aloud" type', () => {
    renderWithTheme(<Prompt isContentReadAloud={false} />);
    const hasIcon = screen
      .queryByText('Do Not Read Aloud')
      // eslint-disable-next-line testing-library/no-node-access
      ?.parentElement?.querySelector('i');
    const hasAriaHiddenAttribute = hasIcon
      ? hasIcon.getAttribute('aria-hidden')
      : false;
    expect(Boolean(hasAriaHiddenAttribute)).toBe(true);
  });

  it('renders children', () => {
    renderWithTheme(
      <Prompt>
        <div>some stuff in here</div>
      </Prompt>
    );
    expect(screen.getByText('some stuff in here')).not.toBeNull();
  });
});
