/* eslint-env jest */

import React from 'react';
import { mountWithTheme, renderWithTheme } from 'styled-enzyme';

import Checkbox from './Checkbox';

let instance;

function simulateLabelClick() {
  instance.find('input').simulate('click', { target: { checked: true } });
}

beforeEach(() => {
  instance = mountWithTheme(<Checkbox labelText="test" />);
});

it('the onClick prop gets executed with the value of the checkbox when clicked', () => {
  const onClick = jest.fn();
  instance.setProps({ onClick });

  simulateLabelClick();

  expect(onClick).toHaveBeenCalled();
});

it('Checkbox renders as expected', () => {
  const tree = renderWithTheme(
    <Checkbox labelText="Render test" isDisabled isChecked />
  );
  expect(tree).toMatchSnapshot();
});
