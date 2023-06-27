/* eslint-env jest */
import React from 'react';

import Button from './Button';
import { renderWithTheme } from '../../util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('renders child text inside of button', async () => {
  const innerText = 'Hello';
  renderWithTheme(<Button>{innerText}</Button>);
  const button = await screen.findByText(innerText);
  expect(button).toBeInTheDocument();
});

it('renders child nodes inside of button', () => {
  const innerText = 'Hello';
  renderWithTheme(
    <Button>
      <span>{innerText}</span>
    </Button>
  );

  const foundChild = screen.getByText(innerText);
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', async () => {
  const onClick = jest.fn();
  const innerText = 'Hello';
  renderWithTheme(<Button onClick={onClick}>{innerText}</Button>);

  await userEvent.click(await screen.findByText(innerText));

  expect(onClick).toHaveBeenCalled();
});

it('works with no onClick', () => {
  const innerText = 'Hello';
  renderWithTheme(<Button>{innerText}</Button>);

  expect(
    async () => await userEvent.click(await screen.findByText(innerText))
  ).not.toThrow();
});

it('blocks click while waiting', async () => {
  const onClick = jest.fn();
  const innerText = 'Hello';
  renderWithTheme(
    <Button onClick={onClick} waiting>
      {innerText}
    </Button>
  );

  await userEvent.click(await screen.findByText(innerText));

  expect(onClick).not.toHaveBeenCalled();
});
