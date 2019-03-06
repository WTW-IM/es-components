/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';

import SideNav from './SideNav';

let instanceToRender;
const onClick = jest.fn();

beforeEach(() => {
  onClick.mockClear();

  instanceToRender = (
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
});

it('executes onClick when nav item clicked', () => {
  const { getByText } = renderWithTheme(instanceToRender);
  getByText('Home').click();
  expect(onClick).toHaveBeenCalled();
});

it('disabled item prevents onclick functions', () => {
  const { getByText } = renderWithTheme(instanceToRender);
  getByText('Disabled').click();
  expect(onClick).not.toBeCalled();
});
