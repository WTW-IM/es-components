/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import FormGroup from './FormGroup';

jest.mock('./containers.less', () => ({}));

describe('FormGroup container component', () => {
  let instance;

  beforeEach(() => {
    instance = shallow(
      <FormGroup>
        <div>Test</div>
      </FormGroup>
    );
  });

  it('has form-group class when inline prop is false by default', () => {
    expect(instance.hasClass('form-group')).toBe(true);
    expect(instance.hasClass('form-group-inline')).toBe(false);
  });

  it('has form-group-inline class when inline prop is true', () => {
    instance.setProps({ inline: true });
    expect(instance.hasClass('form-group')).toBe(false);
    expect(instance.hasClass('form-group-inline')).toBe(true);
  });

  it('has error class only when hasError prop is true', () => {
    expect(instance.hasClass('error')).toBe(false);
    instance.setProps({ hasError: true });
    expect(instance.hasClass('error')).toBe(true);
  });
});
