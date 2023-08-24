import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../util/test-utils';

import SideNav from './SideNav';
const user = userEvent.setup({
  pointerEventsCheck: 0
});

const onClick = jest.fn();

const TestNav = () => (
  <SideNav selected="home">
    <SideNav.Item id="home" className="home">
      <button type="button" onClick={onClick}>
        Home
      </button>
    </SideNav.Item>
    <SideNav.Item id="cart">
      <button type="button">Cart</button>
    </SideNav.Item>
    <SideNav.Item id="external">
      <a href="https://google.com">External Link</a>
    </SideNav.Item>
    <SideNav.Item id="info" onClick={onClick} isDisabled>
      <button type="button">Disabled</button>
    </SideNav.Item>
  </SideNav>
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
