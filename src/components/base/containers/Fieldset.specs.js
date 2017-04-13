/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Fieldset from './Fieldset';

describe('Fieldset component', () => {
  it('adds additional classes to legend element when aditionalLegendClasses prop is supplied', () => {
    const instance = mount(
      <Fieldset
        legendText="I am legend"
        additionalLegendClasses="legendary"
      />
    );
    expect(instance.find('legend').hasClass('legendary')).toBe(true);
  });

  it('renders as expected', () => {
    const tree = renderer.create(
      <Fieldset>
        <div>Fieldset child</div>
      </Fieldset>
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders as expected with legendText', () => {
    const tree = renderer.create(
      <Fieldset legendText="I am legend">
        <div>Fieldset child</div>
      </Fieldset>
    );

    expect(tree).toMatchSnapshot();
  });
});
