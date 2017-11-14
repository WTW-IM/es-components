/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import DatePicker from './DatePicker';

describe('DatePicker component', () => {
  let instance;
  let input;
  const handleOnChange = jest.fn();
  const handleOnChangeRaw = jest.fn();
  const mockOnChangeRawEvent = { target: { value: 'some date' } };
  const mockOnChangeEvent = { target: { value: '10/12/2017' } };

  beforeEach(() => {
    instance = mount(
      <DatePicker
        labelText="Test Date"
        onChange={handleOnChange}
        onChangeRaw={handleOnChangeRaw}
      />
    );

    input = instance.find('input');
    handleOnChange.mockClear();
    handleOnChangeRaw.mockClear();
  });

  it('executes the handleOnChange function when valid date is entered', () => {
    input.simulate('change', mockOnChangeEvent);
    expect(handleOnChange).toBeCalled();
  });

  it('does not execute handleOnChange unless date is valid', () => {
    input.simulate('change', mockOnChangeRawEvent);
    expect(handleOnChange).not.toBeCalled();
  });

  it('executes the handleOnChangeRaw function when any input is entered', () => {
    input.simulate('change', mockOnChangeRawEvent);
    expect(handleOnChangeRaw).toBeCalled();
  });
});
