/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';

describe('Icon', () => {
  it('includes the aria-hidden attribute', () => {
    const instance = shallow(<Icon name="federal" size={16} />);
    expect(instance.prop('aria-hidden')).toBe(true);
  });
});
