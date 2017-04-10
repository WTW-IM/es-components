/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

jest.mock('./oe-icons.less', () => ({}));

import Icon from './Icon';

describe('Icon', () => {
  it('applies the classname for a given name', () => {
    const instance = shallow(<Icon name="federal" size={16} />);
    expect(instance.hasClass('oe-icon-federal')).toBe(true);
  });

  it('applies the correct size class', () => {
    const instance = shallow(<Icon name="federal" size={18} />);
    expect(instance.hasClass('size-18')).toBe(true);
  });

  it('applies the oe-icon-lt-* class when given the lightweight prop', () => {
    const instance = shallow(<Icon name="federal" size={16} lightweight />);
    expect(instance.hasClass('oe-icon-lt-federal')).toBe(true);
  });

  it('includes the aria-hidden attribute', () => {
    const instance = shallow(<Icon name="federal" size={16} />);
    expect(instance.prop('aria-hidden')).toBe(true);
  });
});
