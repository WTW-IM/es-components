/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Checkbox from './Checkbox';

let instance;

function simulateLabelClick() {
  instance.find('input').simulate('click', { target: { checked: true } });
}

beforeEach(() => {
  instance = mount(<Checkbox labelText="test" />);
});

it('the onClick prop gets executed with the value of the checkbox when clicked', () => {
  const onClick = jest.fn();
  instance.setProps({ onClick });

  simulateLabelClick();

  expect(onClick).toHaveBeenCalled();
});

it('Checkbox renders as expected', () => {
  const tree = renderer.create(
    <Checkbox labelText="Render test" isDisabled isChecked />
  );
  expect(tree).toMatchSnapshot();
});
