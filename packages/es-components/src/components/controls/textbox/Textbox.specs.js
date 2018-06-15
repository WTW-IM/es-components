/* eslint-env jest */

import React from 'react';
import { mountWithTheme } from '../../../testing';

import Icon from '../../base/icons/Icon';
import Textbox from './Textbox';

const buildTextbox = props => <Textbox labelText="Text" {...props} />;

describe('Textbox component', () => {
  const handleOnChange = jest.fn();
  const handleOnBlur = jest.fn();
  const mockEvent = { target: { value: '112' } };

  it('executes the handleOnChange function when text is changed', () => {
    const props = {
      onChange: handleOnChange
    };
    const input = mountWithTheme(buildTextbox(props)).find('input');

    input.simulate('change', mockEvent);
    expect(handleOnChange).toBeCalled();
    handleOnChange.mockClear();
  });

  it('executes the handeOnBlur function when the input focus is lost', () => {
    const props = {
      onBlur: handleOnBlur
    };
    const input = mountWithTheme(buildTextbox(props)).find('input');

    input.simulate('blur', mockEvent);
    expect(handleOnBlur).toBeCalled();
    handleOnBlur.mockClear();
  });

  it('renders addon icon when "prependIconName" prop is passed', () => {
    const props = {
      prependIconName: 'prepend'
    };
    const instance = mountWithTheme(buildTextbox(props));

    expect(instance.find(Icon).length).toBe(1);
  });

  it('renders addon icon when "appendIconName" prop is passed', () => {
    const props = {
      appendIconName: 'append'
    };
    const instance = mountWithTheme(buildTextbox(props));

    expect(instance.find(Icon).length).toBe(1);
  });

  it('renders addon icons when both "prependIconName" and "appendIconName" props are passed', () => {
    const props = {
      prependIconName: 'prepend',
      appendIconName: 'append'
    };
    const instance = mountWithTheme(buildTextbox(props));

    expect(instance.find(Icon).length).toBe(2);
  });

  it('sets aria-describedby on input when the additionalHelpContent prop is provided', () => {
    const instance = mountWithTheme(buildTextbox());
    const input = () => instance.find('input');

    let describedBy = input().prop('aria-describedby');
    expect(describedBy).toBeNull();

    instance.setProps({
      id: 'abcdef',
      additionalHelpContent: 'I am here to help'
    });
    describedBy = input().prop('aria-describedby');
    expect(describedBy).not.toBeUndefined();
    expect(describedBy).toBe('abcdef-help');
  });

  it('renders additionalHelp when the additionalHelpContent props is provided', () => {
    const instance = mountWithTheme(buildTextbox());

    let help = instance.find('.textbox__help');
    expect(help.length).toBe(0);

    instance.setProps({ additionalHelpContent: 'I am here to help' });

    help = instance.find('.textbox__help').hostNodes();
    expect(help.text()).toBe('I am here to help');
  });

  it('renders icon when the validationState prop is set', () => {
    const instance = mountWithTheme(buildTextbox());

    let icon = instance.find(Icon);
    expect(icon.length).toBe(0);

    instance.setProps({ validationState: 'danger' });

    icon = instance.find(Icon);
    expect(icon.length).toBe(1);
  });
});

describe('Textbox with Mask', () => {
  const handleOnChange = jest.fn();
  const handleOnBlur = jest.fn();
  const mockEvent = { target: { value: '112' } };

  it('executes the handleOnChange function when text is changed with mask', () => {
    const props = {
      maskType: 'ssnum',
      onChange: handleOnChange
    };
    const textMask = mountWithTheme(buildTextbox(props)).find('input');

    textMask.simulate('change', mockEvent);
    expect(handleOnChange).toBeCalled();
    handleOnChange.mockClear();
  });

  it('executes the handeOnBlur function when the input focus is lost with mask', () => {
    const props = {
      maskType: 'ssnum',
      onBlur: handleOnBlur
    };
    const textMask = mountWithTheme(buildTextbox(props)).find('input');

    textMask.simulate('blur', mockEvent);
    expect(handleOnBlur).toBeCalled();
    handleOnBlur.mockClear();
  });

  it('displays a default title for ssnum mask', () => {
    const props = {
      maskType: 'ssnum'
    };
    const textMask = mountWithTheme(buildTextbox(props)).find('input');
    expect(textMask.props().title).toBe('Enter 9-digit social security number');
  });

  it('displays a custom title when passed as prop for ssnum mask', () => {
    const props = {
      maskType: 'ssnum',
      title: 'Test me'
    };
    const textMask = mountWithTheme(buildTextbox(props)).find('input');
    expect(textMask.props().title).toBe('Test me');
  });
});
