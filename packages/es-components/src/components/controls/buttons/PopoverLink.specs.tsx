/* eslint-env jest */
/* eslint react/prop-types: 0 */
import React from 'react';

import PopoverLink, { PopoverLinkProps } from './PopoverLink';
import { renderWithTheme } from '../../util/test-utils';
import { screen } from '@testing-library/react';

const onClick = jest.fn();

function buildButton(props: PopoverLinkProps) {
  const { children, ...otherProps } = props;
  const defaultProps = {
    onClick
  };
  const mergedProps = { ...defaultProps, ...otherProps };

  return <PopoverLink {...mergedProps}>{children}</PopoverLink>;
}

it('renders child text inside of button', () => {
  renderWithTheme(buildButton({ children: 'Test button' }));
  const button = screen.queryByText('Test button');
  expect(button).not.toBeNull();
});

it('renders child nodes inside of button', () => {
  const child = <span>Hello</span>;

  renderWithTheme(buildButton({ children: child }));

  const foundChild = screen.getByText('Hello');
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', () => {
  renderWithTheme(buildButton({ children: 'Test' }));

  screen.getByText('Test').click();

  expect(onClick).toHaveBeenCalled();
});
