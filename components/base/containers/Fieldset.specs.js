/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import Fieldset from './Fieldset';

jest.mock('./containers.less', () => ({}));

describe('Fieldset component', () => {
  let instance;

  beforeEach(() => {
    instance = shallow(<Fieldset />);
  });

  it('does not render a legend when the legendText prop is not supplied', () => {
    expect(instance.find('legend').length).toEqual(0);
  });

  it('renders a legend when the legendText prop is supplied', () => {
    instance.setProps({ legendText: 'I am legend' });
    expect(instance.find('legend').length).not.toBeUndefined();
  });

  it('adds additional classes to legend element when aditionalLegendClasses prop is supplied', () => {
    instance.setProps({ legendText: 'I am legend', additionalLegendClasses: 'legendary' });
    expect(instance.find('legend').hasClass('legendary')).toBe(true);
  });
});
