/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import ToggleButton from './ToggleButton';

let instance;
const onClick = jest.fn();

beforeEach(() => {
  instance = mount(<ToggleButton handleOnClick={onClick}>test</ToggleButton>);
});


it('sets isPressed state on click', () => {
  instance.simulate('click');
  expect(instance.state().isPressed).toBe(true);
  instance.simulate('click');
  expect(instance.state().isPressed).toBe(false);
});
