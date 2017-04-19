/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import Dropdown from './Dropdown';

describe('Dropdown component', () => {
  let instance;
  let select;

  beforeEach(() => {
    const options = [{
      optionText: 'Test 1',
      optionValue: '1'
    }, {
      optionText: 'Test 2',
      optionValue: '2'
    }, {
      optionText: 'Test 3',
      optionValue: '3'
    }];

    instance = mount(
      <Dropdown
        labelText="Test"
        options={options}
      />
    );

    select = instance.find('select');
  });

  it('executes the passed in "onOptionChanged" function', () => {
    const onOptionChanged = jest.fn();
    instance.setProps({ onOptionChanged });

    select.simulate('change', { target: { value: '1' } });

    expect(onOptionChanged).toHaveBeenCalledWith('1');
  });

  it('executes the passed in "onDropdownFocusLost" function', () => {
    const onDropdownFocusLost = jest.fn();
    instance.setProps({ onDropdownFocusLost });

    select.simulate('blur', { target: { value: '2' } });

    expect(onDropdownFocusLost).toHaveBeenCalledWith('2');
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
