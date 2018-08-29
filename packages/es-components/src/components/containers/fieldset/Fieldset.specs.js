/* eslint-env jest */

import React from 'react';
import { mountWithTheme, renderWithTheme } from 'styled-enzyme';

import Fieldset from './Fieldset';

describe('Fieldset component', () => {
  it('adds additional classes to legend element when aditionalLegendClasses prop is supplied', () => {
    const instance = mountWithTheme(
      <Fieldset legendContent="I am legend" legendClasses="legendary" />
    );
    expect(instance.find('legend').hasClass('legendary')).toBe(true);
  });

  it('renders as expected', () => {
    const tree = renderWithTheme(
      <Fieldset>
        <div>Fieldset child</div>
      </Fieldset>
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders as expected with legendText', () => {
    const tree = renderWithTheme(
      <Fieldset legendContent="I am legend">
        <div>Fieldset child</div>
      </Fieldset>
    );

    expect(tree).toMatchSnapshot();
  });
});
