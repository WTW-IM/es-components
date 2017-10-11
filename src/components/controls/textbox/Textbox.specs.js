/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import Icon from '../../base/icons/Icon';
import Textbox from './Textbox';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

describe('Textbox component', () => {
  let instance;
  let input;
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const mockEvent = { target: { value: 'some text' } };

  beforeEach(() => {
    instance = mount(
      <Textbox labelText="Text" onChange={onChange} onBlur={onBlur} />
    );

    input = instance.find('input');
  });

  it('executes the handleOnChange function when text is changed', () => {
    input.simulate('change', mockEvent);
    expect(onChange).toHaveBeenCalled();
  });

  it('executes the handeOnBlur function when the input focus is lost', () => {
    input.simulate('blur', mockEvent);
    expect(onBlur).toHaveBeenCalled();
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

    instance.setProps({ additionalHelpContent: 'I am here to help' });

    describedBy = input.prop('aria-describedby');
    expect(describedBy).not.toBeUndefined();
    expect(describedBy).toBe('abcdef');
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
