/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { range } from 'lodash';

import RadioButton from './RadioButton';
import { RadioGroup } from './RadioGroup';

function buildOptions(numberOfOptions, optionIndexToDisable) {
  return range(0, numberOfOptions).map(idx => ({
    optionText: `Option ${idx}`,
    optionValue: idx,
    isDisabled: idx === optionIndexToDisable
  }));
}

describe('RadioGroup component', () => {
  let instance;
  let defaultOptions;

  beforeEach(() => {
    defaultOptions = buildOptions(3);

    instance = shallow(
      <RadioGroup name="test" radioOptions={defaultOptions} />
    );
  });

  it('renders a RadioButton for each option', () => {
    expect(instance.find(RadioButton).length).toBe(3);
  });

  it('renders each RadioButton as disabled when disableAllOptions is true', () => {
    instance.setProps({ disableAllOptions: true });

    const allDisabled = instance
      .find(RadioButton)
      .everyWhere(x => x.prop('isDisabled'));

    expect(allDisabled).toBe(true);
  });

  it('renders a specific RadioButton as disabled when that option is set to disabled', () => {
    const radioOptions = buildOptions(3, 0);
    instance.setProps({ radioOptions });

    const firstRadio = instance.find(RadioButton).first();
    expect(firstRadio.prop('isDisabled')).toBe(true);

    const lastRadio = instance.find(RadioButton).last();
    expect(lastRadio.prop('isDisabled')).toBe(false);
  });

  it('renders each radio in an error state when hasError is true', () => {
    instance.setProps({ hasError: true });

    const allErrored = instance
      .find(RadioButton)
      .everyWhere(radio => radio.prop('hasError'));

    expect(allErrored).toBe(true);
  });

  it('renders as expected', () => {
    const tree = renderer.create(
      <RadioGroup name="test" radioOptions={defaultOptions} />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders as expected with legend text', () => {
    const tree = renderer.create(
      <RadioGroup
        name="test"
        radioOptions={defaultOptions}
        legendContent="Test legend"
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
