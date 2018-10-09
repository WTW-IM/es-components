/* eslint-env jest */

import React from 'react';
import { mountWithTheme, renderWithTheme } from 'styled-enzyme';
import { range } from 'lodash';
import viaTheme from 'es-components-via-theme';

import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';

function buildOptions(numberOfOptions, optionIndexToDisable) {
  return range(0, numberOfOptions).map(idx => ({
    optionText: `Option ${idx}`,
    optionValue: idx,
    disabled: idx === optionIndexToDisable
  }));
}

describe('RadioGroup component', () => {
  let instance;
  let defaultOptions;

  beforeEach(() => {
    defaultOptions = buildOptions(3);

    instance = mountWithTheme(
      <RadioGroup name="test" radioOptions={defaultOptions} />,
      viaTheme
    );
  });

  it('renders a RadioButton for each option', () => {
    expect(instance.find(RadioButton).length).toBe(3);
  });

  it('renders each RadioButton as disabled when disableAllOptions is true', () => {
    instance.setProps({ disableAllOptions: true });

    const allDisabled = instance
      .find(RadioButton)
      .everyWhere(x => x.prop('disabled'));

    expect(allDisabled).toBe(true);
  });

  it('renders a specific RadioButton as disabled when that option is set to disabled', () => {
    const radioOptions = buildOptions(3, 0);
    instance.setProps({ radioOptions });

    const firstRadio = instance.find(RadioButton).first();
    expect(firstRadio.prop('disabled')).toBe(true);

    const lastRadio = instance.find(RadioButton).last();
    expect(lastRadio.prop('disabled')).toBe(false);
  });

  it('renders each radio in an error state when hasError is true', () => {
    instance.setProps({ validationState: 'danger' });

    const allErrored = instance
      .find(RadioButton)
      .everyWhere(radio => radio.prop('validationState') === 'danger');

    expect(allErrored).toBe(true);
  });

  it('renders as expected', () => {
    const tree = renderWithTheme(
      <RadioGroup name="test" radioOptions={defaultOptions} value={0} />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders as expected with legend text and extraContent', () => {
    const tree = renderWithTheme(
      <RadioGroup
        name="test"
        radioOptions={defaultOptions}
        legendContent="Test legend"
        extraContent="Extra Content!"
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
