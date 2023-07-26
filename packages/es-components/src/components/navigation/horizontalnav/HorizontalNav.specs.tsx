import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../util/test-utils';

import HorizontalNav from './HorizontalNav';
const user = userEvent.setup({
  pointerEventsCheck: 0
});

const onClick = jest.fn();

const TestNav = () => (
  <HorizontalNav selected="home">
    <HorizontalNav.Item id="home" className="home">
      <button type="button" onClick={onClick}>
        Home
      </button>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="cart">
      <button type="button">Cart</button>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="external">
      <a href="https://google.com">External Link</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="info" onClick={onClick} isDisabled>
      <button type="button">Disabled</button>
    </HorizontalNav.Item>
  </HorizontalNav>
);

beforeEach(() => {
  onClick.mockClear();
});

it('renders as expected', () => {
  const { container } = renderWithTheme(<TestNav />);
  expect(container).toMatchSnapshot();
});

it('executes onClick when nav item clicked', async () => {
  renderWithTheme(<TestNav />);
  await user.click(await screen.findByRole('button', { name: /home/i }));
  expect(onClick).toHaveBeenCalled();
});

it('disabled item prevents onclick functions', async () => {
  renderWithTheme(<TestNav />);
  await user.click(await screen.findByRole('button', { name: /disabled/i }));
  expect(onClick).not.toHaveBeenCalled();
});
