/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

jest.mock('./oe-icons.less', () => ({}));

import Icon from './Icon';

describe('Icon', () => {
  it('applies the classname for a given name', () => {
    const instance = shallow(<Icon name="federal" />);
    expect(instance.hasClass('oe-icon-federal')).toBe(true);
  });

  it('applies the correct size class', () => {
    const instance = shallow(<Icon name="federal" size={18} />);
    expect(instance.hasClass('size-18')).toBe(true);
  });

  it('applies the icon-white class given the white prop', () => {
    const instance = shallow(<Icon name="federal" white />);
    expect(instance.hasClass('icon-white')).toBe(true);
  });
});
