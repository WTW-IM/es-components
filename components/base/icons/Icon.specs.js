import React from 'react';
import { shallow } from 'enzyme';
import Icon from './Icon';

describe('Icon', () => {
  it('applies the classname for a given name', () => {
    const instance = shallow(<Icon name="federal" />);
    expect(instance.hasClass('oe-icon-federal')).toBe(true);
  });

  it('applies the correct size class', () => {
    const instance = shallow(<Icon name="federal" size="24" />);
    expect(instance.hasClass('size-24')).toBe(true);
  });
});
