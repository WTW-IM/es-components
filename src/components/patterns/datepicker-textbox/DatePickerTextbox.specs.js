/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import DatePickerTextbox from './DatePickerTextbox';

let instance;
let textboxInput;

beforeEach(() => {
  instance = mount(<DatePickerTextbox labelText="test" />);
  textboxInput = instance.find('input');
});

describe('when the textbox is focused', () => {
  it('sets displayPicker on the state to true', () => {
    textboxInput.simulate('focus');

    expect(instance.state('displayPicker')).toBe(true);
  });

  it('does not set displayPicker on the state to true when previouslyDisplayed is true', () => {
    instance.setState({ previouslyDisplayed: true });
    textboxInput.simulate('focus');
    expect(instance.state('displayPicker')).toBe(false);
  });
});

describe('when the textbox is clicked', () => {
  it("sets displayPicker to the the opposite of it's previous state value", () => {
    expect(instance.state('displayPicker')).toBe(false);
    textboxInput.simulate('click');
    expect(instance.state('displayPicker')).toBe(true);
  });
});

describe('when the textbox focus is lost', () => {
  let dateSelected;
  beforeEach(() => {
    dateSelected = jest.fn();
    instance.setProps({ dateSelected });
  });

  it('sets previouslyDisplay on the state to false', () => {
    instance.setState({ previouslyDisplayed: true });
    textboxInput.simulate('blur');
    expect(instance.state('previouslyDisplayed')).toBe(false);
  });

  describe('when the textbox value is parseable', () => {
    it('calls dateSelected prop when the date is parseable', () => {
      const date = '1/1/2017';
      textboxInput.simulate('blur', { target: { value: date } });

      expect(dateSelected.mock.calls[0][0]).toEqual(new Date(2017, 0, 1));
    });

    it('sets the preselectedDate on state when the date is parseable', () => {
      const date = '1/1/2017';
      textboxInput.simulate('blur', { target: { value: date } });

      expect(instance.state('preselectedDate')).toBe(date);
    });
  });

  describe('when the textbox value is not a parseable date', () => {
    it('does not call dateSelected prop when date is not parseable', () => {
      const date = '';
      textboxInput.simulate('blur', { target: { value: date } });

      expect(dateSelected.mock.calls.length).toBe(0);
    });

    it('does not set the preselectedDate on state', () => {
      const date = '';
      textboxInput.simulate('blur', { target: { value: date } });

      expect(instance.state('preselectedDate')).toBe(undefined);
    });
  });
});
