/* eslint-env jest */
import React from 'react';

import Button from './Button';
import { renderWithTheme } from '../../util/test-utils';

it('renders child text inside of button', () => {
  const innerText = 'Hello';
  const { queryByText } = renderWithTheme(<Button>{innerText}</Button>);
  const button = queryByText(innerText);
  expect(button).not.toBeNull();
});

it('renders child nodes inside of button', () => {
  const innerText = 'Hello';
  const { getByText } = renderWithTheme(
    <Button>
      <span>{innerText}</span>
    </Button>
  );

  const foundChild = getByText(innerText);
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', () => {
  const onClick = jest.fn();
  const innerText = 'Hello';
  const { getByText } = renderWithTheme(
    <Button onClick={onClick}>{innerText}</Button>
  );

  getByText(innerText).click();

  expect(onClick).toHaveBeenCalled();
});

it('works with no onClick', () => {
  const innerText = 'Hello';
  const { getByText } = renderWithTheme(<Button>{innerText}</Button>);

  expect(() => getByText(innerText).click()).not.toThrow();
});

it('blocks click while waiting', () => {
  const onClick = jest.fn();
  const innerText = 'Hello';
  const { getByText } = renderWithTheme(
    <Button onClick={onClick} waiting>
      {innerText}
    </Button>
  );

  getByText(innerText).click();

  expect(onClick).not.toHaveBeenCalled();
});

it('blocks click while waiting', () => {
  const onClick = jest.fn();
  const innerText = 'Hello';
  const { getByText } = renderWithTheme(
    <Button onClick={onClick} waiting>
      {innerText}
    </Button>
  );

  getByText(innerText).click();

  expect(onClick).not.toHaveBeenCalled();
});
