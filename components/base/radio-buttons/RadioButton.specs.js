/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

jest.mock('../../../styles/inputs.less', () => ({}));
jest.mock('./radio-buttons.less', () => ({}));

import RadioButton from './RadioButton';

describe('RadioButton component', () => {
  let radioButtonInstance;
  let radioDisplaySpan;

  beforeEach(() => {
    radioButtonInstance = mount(<RadioButton name="test" labelText="Testing 1, 2, 3" />);
    radioDisplaySpan = radioButtonInstance.find('span').last();
  });

  it('applies the empty-radio class when checked, disabled, and shouldDisplayValidation are false', () => {
    expect(radioDisplaySpan.hasClass('empty-radio')).toBe(true);
  });

  it('applies the errored-radio class when checked and disabled are false and shouldDisplayValidation is true', () => {
    radioButtonInstance.setProps({ shouldDisplayValidation: true })
    expect(radioDisplaySpan.hasClass('errored-radio')).toBe(true);
  });

  it('applies the disabled-radio class when checked and shouldDisplayValidation are false and disabled is true', () => {
    radioButtonInstance.setProps({ disabled: true });
    expect(radioDisplaySpan.hasClass('disabled-radio')).toBe(true);
  });

  it('applies the filled-radio class when disabled and shouldDisplayValidation are false and checked is true', () => {
    radioButtonInstance.setProps({ checked: true });
    expect(radioDisplaySpan.hasClass('filled-radio')).toBe(true);
  });

  it('applies the disabled-filled-radio class when shouldDisplayValidation is false and checked and disabled are true', () => {
    radioButtonInstance.setProps({ checked: true, disabled: true});
    expect(radioDisplaySpan.hasClass('disabled-filled-radio')).toBe(true);
  });
});
