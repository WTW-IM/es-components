/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

let instance;
const onClick = jest.fn();

beforeEach(() => {
  instance = shallow(<Button handleOnClick={onClick}>test</Button>);
});

it('renders child text inside of button', () => {
  expect(instance.children().text()).toBe('test');
});

it('renders child nodes inside of button', () => {
  const child = <span>Hello</span>;

  const instanceWithChild = shallow(
    <Button handleOnClick={jest.fn()}>{child}</Button>
  );

  expect(instanceWithChild.children().node).toBe(child);
});

it('executes the handleOnClick function passed', () => {
  instance.simulate('click');

  expect(onClick.mock.calls.length).toBe(1);
});
