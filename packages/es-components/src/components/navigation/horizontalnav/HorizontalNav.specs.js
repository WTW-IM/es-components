/* eslint-env jest */

import React from 'react';
import { renderWithTheme } from '../../util/test-utils';

import HorizontalNav from './HorizontalNav';

let instanceToRender;
const onClick = jest.fn();

beforeEach(() => {
  onClick.mockClear();

  instanceToRender = (
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
});

it('renders as expected', () => {
  const { container } = renderWithTheme(instanceToRender);
  expect(container).toMatchSnapshot();
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
