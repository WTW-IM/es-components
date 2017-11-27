/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import Icon from '../../base/icons/Icon';
import Textbox from './Textbox';

describe('Textbox component', () => {
  let instance;
  let input;
  const handleOnChange = jest.fn();
  const handleOnBlur = jest.fn();
  const mockEvent = { target: { value: '112' } };

  beforeEach(() => {
    instance = mount(
      <Textbox
        labelText="Text"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    );

    input = instance.find('input');
    handleOnChange.mockClear();
    handleOnBlur.mockClear();
  });

  it('executes the handleOnChange function when text is changed', () => {
    input.simulate('change', mockEvent);
    expect(handleOnChange).toBeCalled();
  });

  it('executes the handeOnBlur function when the input focus is lost', () => {
    input.simulate('blur', mockEvent);
    expect(handleOnBlur).toBeCalled();
  });

  it('renders addon icon when "prependIconName" prop is passed', () => {
    instance.setProps({ prependIconName: 'prepend' });

    expect(instance.find(Icon).length).toBe(1);
  });

  it('renders addon icon when "appendIconName" prop is passed', () => {
    instance.setProps({ appendIconName: 'append' });

    expect(instance.find(Icon).length).toBe(1);
  });

  it('renders addon icons when both "prependIconName" and "appendIconName" props are passed', () => {
    instance.setProps({ prependIconName: 'prepend', appendIconName: 'append' });

    expect(instance.find(Icon).length).toBe(2);
  });

  it('sets aria-describedby on input when the additionalHelpContent prop is provided', () => {
    let describedBy = input.prop('aria-describedby');
    expect(describedBy).toBeNull();

    instance.setProps({
      id: 'abcdef',
      additionalHelpContent: 'I am here to help'
    });

    describedBy = input.prop('aria-describedby');
    expect(describedBy).not.toBeUndefined();
    expect(describedBy).toBe('abcdef-help');
  });

  it('renders additionalHelp when the additionalHelpContent props is provided', () => {
    let help = instance.find('.textbox__help');
    expect(help.length).toBe(0);

    instance.setProps({ additionalHelpContent: 'I am here to help' });

    help = instance.find('.textbox__help');
    expect(help.text()).toBe('I am here to help');
  });

  it('renders icon when the validationState prop is set', () => {
    let icon = instance.find(Icon);
    expect(icon.length).toBe(0);

    instance.setProps({ validationState: 'danger' });

    icon = instance.find(Icon);
    expect(icon.length).toBe(1);
  });
});

describe('Textbox with Mask', () => {
  let instance;
  let input;
  const handleOnChange = jest.fn();
  const handleOnBlur = jest.fn();
  const mockEvent = { target: { value: '112' } };

  beforeEach(() => {
    instance = mount(
      <Textbox
        labelText="Text"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        maskType="ssnum"
      />
    );

    input = instance.find('input');
    handleOnChange.mockClear();
    handleOnBlur.mockClear();
  });

  it('executes the handleOnChange function when text is changed with mask', () => {
    input.simulate('change', mockEvent);
    expect(handleOnChange).toBeCalled();
  });

  it('executes the handeOnBlur function when the input focus is lost with mask', () => {
    input.simulate('blur', mockEvent);
    expect(handleOnBlur).toBeCalled();
  });
});
