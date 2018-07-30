/* eslint-env jest */

import React from 'react';
import { shallowWithTheme } from 'styled-enzyme';
import viaTheme from 'es-components-via-theme';

import { Button } from './Button';

let instance;
const onClick = jest.fn();

beforeEach(() => {
  instance = shallowWithTheme(
    <Button handleOnClick={onClick} theme={viaTheme}>
      test
    </Button>
  ).dive();
});

it('renders child text inside of button', () => {
  expect(instance.children().text()).toBe('test');
});

it('renders child nodes inside of button', () => {
  const child = <span>Hello</span>;

  const instanceWithChild = shallowWithTheme(
    <Button handleOnClick={jest.fn()} theme={viaTheme}>
      {child}
    </Button>
  );

  expect(
    instanceWithChild
      .dive()
      .children()
      .getElement()
  ).toMatchObject(child);
});

it('executes the handleOnClick function passed', () => {
  instance.dive().simulate('click');

  expect(onClick.mock.calls.length).toBe(1);
});
