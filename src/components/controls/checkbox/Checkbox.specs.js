/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Checkbox from './Checkbox';

let instance;

function simulateLabelClick() {
  instance.find('input').simulate('change', { target: { checked: true } });
}

beforeEach(() => {
  instance = mount(<Checkbox labelText="test" />);
});

it('sets the state to the opposite of the previous state when label is clicked', () => {
  expect(instance.state('isChecked')).toBe(false);

  simulateLabelClick();

  expect(instance.state('isChecked')).toBe(true);
});

it('isChecked on the state is not updated if the isDisabled prop is true when clicked', () => {
  instance.setProps({ disabled: true });

  expect(instance.state('isChecked')).toBe(false);

  simulateLabelClick();

  expect(instance.state('isChecked')).toBe(false);
});

it('the checkedValueChanged prop gets executed with the value of the checkbox when clicked', () => {
  const checkedValueChanged = jest.fn();
  instance.setProps({ checkedValueChanged });

  simulateLabelClick();

  expect(checkedValueChanged.mock.calls.length).toBe(1);
  expect(checkedValueChanged.mock.calls[0][0]).toBe(true);
});

it('Checkbox renders as expected', () => {
  const tree = renderer.create(
    <Checkbox labelText="Render test" disabled initiallyChecked />
  );
  expect(tree).toMatchSnapshot();
});
