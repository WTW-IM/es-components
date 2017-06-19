/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import Icon from '../../base/icons/Icon';

import getAddonType from './getAddonType';
import Addon from './Addon';
import Textbox from './Textbox';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

describe('Textbox component', () => {
  let instance;
  let input;
  const onChange = jest.fn();
  const onFocusLost = jest.fn();

  beforeEach(() => {
    instance = mount(
      <Textbox
        labelText="Text"
        handleOnChange={onChange}
        handleFocusLost={onFocusLost}
      />
    );

    input = instance.find('input');
  });

  it('executes the handleOnChange function when text is changed with the value of the input', () => {
    input.simulate('change', { target: { value: 'text' } });
    expect(onChange).toBeCalledWith('text');
  });

  it('executes the handeFocusLost function when the input focus is lost with the value of the input', () => {
    input.simulate('blur', { target: { value: '' } });
    expect(onFocusLost).toBeCalledWith('');
  });

  it('sets the state to the value when a handler is executed', () => {
    input.simulate('blur', { target: { value: '' } });
    expect(instance.state('currentValue')).toBe('');

    input.simulate('change', { target: { value: 'text' } });
    expect(instance.state('currentValue')).toBe('text');
  });

  it('renders addon content when "prependContent" prop is passed', () => {
    instance.setProps({ prependContent: 'prepend' });

    expect(instance.find(Addon).length).toBe(1);
  });

  it('renders addon content when "appendContent" prop is passed', () => {
    instance.setProps({ appendContent: 'append' });

    expect(instance.find(Addon).length).toBe(1);
  });

  it('renders addon content when both "prependContent" and "appendContent" props are passed', () => {
    instance.setProps({ prependContent: 'prepend', appendContent: 'append' });

    expect(instance.find(Addon).length).toBe(2);
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

describe('getAddonType', () => {
  it('returns "prepend" when hasPrependContent is true and hasAppendContent is false', () => {
    const hasPrependContent = true;
    const hasAppendContent = false;

    const addonType = getAddonType(hasPrependContent, hasAppendContent);
    expect(addonType).toBe('prepend');
  });

  it('returns "append" when hasPrependContent is false and hasAppendContent is true', () => {
    const hasPrependContent = false;
    const hasAppendContent = true;

    const addonType = getAddonType(hasPrependContent, hasAppendContent);
    expect(addonType).toBe('append');
  });

  it('returns "both" when hasPrependContent is true and hasAppendContent is true', () => {
    const hasPrependContent = true;
    const hasAppendContent = true;

    const addonType = getAddonType(hasPrependContent, hasAppendContent);
    expect(addonType).toBe('both');
  });

  it('returns null when hasPrependContent is false and hasAppendContent is false', () => {
    const hasPrependContent = false;
    const hasAppendContent = false;

    const addonType = getAddonType(hasPrependContent, hasAppendContent);
    expect(addonType).toBeNull();
  });
});
