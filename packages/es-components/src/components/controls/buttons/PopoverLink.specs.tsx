import React from 'react';

import PopoverLink, { PopoverLinkProps } from './PopoverLink';
import { renderWithTheme } from '../../util/test-utils';
import { screen } from '@testing-library/react';

const onClick = jest.fn();

function TestLink(props: PopoverLinkProps) {
  const { children, ...otherProps } = props;
  const defaultProps = {
    onClick
  };
  const mergedProps = { ...defaultProps, ...otherProps };

  return <PopoverLink {...mergedProps}>{children}</PopoverLink>;
}

it('renders child text inside of button', () => {
  renderWithTheme(<TestLink>Test button</TestLink>);
  const button = screen.queryByText('Test button');
  expect(button).not.toBeNull();
});

it('renders child nodes inside of button', () => {
  renderWithTheme(
    <TestLink>
      <span>Hello</span>
    </TestLink>
  );

  const foundChild = screen.getByText('Hello');
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', () => {
  renderWithTheme(<TestLink>Test</TestLink>);

  screen.getByText('Test').click();

  expect(onClick).toHaveBeenCalled();
});
