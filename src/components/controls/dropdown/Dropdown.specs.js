/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import Dropdown from './Dropdown';

describe('Dropdown component', () => {
  let instance;
  let select;

  beforeEach(() => {
    const options = [
      {
        optionText: 'Test 1',
        optionValue: '1'
      },
      {
        optionText: 'Test 2',
        optionValue: '2'
      },
      {
        optionText: 'Test 3',
        optionValue: '3'
      }
    ];

    instance = mount(<Dropdown labelText="Test" options={options} />);

    select = instance.find('select');
  });

  it('executes the passed in "onChange" function', () => {
    const onChange = jest.fn();
    instance.setProps({ onChange });

    const event = { target: { value: '1' } };
    select.simulate('change', event);

    expect(onChange).toHaveBeenCalled();
  });

  it('executes the passed in "onBlur" function', () => {
    const onBlur = jest.fn();
    instance.setProps({ onBlur });

    const event = { target: { value: '2' } };
    select.simulate('blur', event);

    expect(onBlur).toHaveBeenCalled();
  });

  it('does not render the first option when includeDefaultFirstOption is false', () => {
    const optionsLength = () => instance.find('option').length;

    expect(optionsLength()).toBe(4);

    instance.setProps({ includeDefaultFirstOption: false });

    expect(optionsLength()).toBe(3);
  });

  it('renders the text of the first option as the firstOptionDisplayText prop value', () => {
    const firstOptionDisplayText = 'Select one..';

    instance.setProps({ firstOptionDisplayText });

    const optionText = instance.find('option').first().text();
    expect(optionText).toEqual(firstOptionDisplayText);
  });
});
