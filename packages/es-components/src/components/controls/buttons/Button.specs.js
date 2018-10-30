/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Button from './Button';

const onClick = jest.fn();

function buildButton(props) {
  const { children, ...otherProps } = props;
  const defaultProps = {
    handleOnClick: onClick
  };
  const mergedProps = Object.assign({}, defaultProps, otherProps);

  return (
    <ThemeProvider theme={viaTheme}>
      <Button {...mergedProps}>{children}</Button>
    </ThemeProvider>
  );
}

it('renders child text inside of button', () => {
  const { queryByText } = render(buildButton({ children: 'Test button' }));
  const button = queryByText('Test button');
  expect(button).not.toBeNull();
});

it('renders child nodes inside of button', () => {
  const child = <span>Hello</span>;

  const { getByText } = render(buildButton({ children: child }));

  const foundChild = getByText('Hello');
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the handleOnClick function passed', () => {
  const { getByText } = render(buildButton({ children: 'Test' }));

  getByText('Test').click();

  expect(onClick).toHaveBeenCalled();
});
