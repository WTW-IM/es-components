/* eslint-env jest */
/* eslint-disable max-len */

import React from 'react';
import renderer from 'react-test-renderer';

import defaultTheme from '../../theme/defaultTheme';
import getRadioFillVariables from './radio-fill-variables';
import RadioButton from './RadioButton';

describe('RadioButton component', () => {
  it('renders as expected', () => {
    const tree = renderer.create(
      <RadioButton id="test" optionText="test" name="rad" />
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('getRadioFillVariables', () => {
  it('returns { fill: gray, hover: white } when unchecked, disabled, and valid', () => {
    const checked = false;
    const disabled = true;
    const invalid = false;

    const { fill, hover } = getRadioFillVariables(
      checked,
      disabled,
      invalid,
      defaultTheme.colors
    );

    expect(fill).toBe(defaultTheme.colors.gray);
    expect(hover).toBe(defaultTheme.colors.white);
  });

  it('returns { fill: info } when checked, not disabled, and valid', () => {
    const checked = true;
    const disabled = false;
    const invalid = false;

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      invalid,
      defaultTheme.colors
    );

    expect(fill).toBe(defaultTheme.colors.info);
  });

  it('returns { fill: gray } when checked, disabled, and valid', () => {
    const checked = true;
    const disabled = true;
    const invalid = false;

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      invalid,
      defaultTheme.colors
    );

    expect(fill).toBe(defaultTheme.colors.gray);
  });

  it('returns { fill: danger, hover: danger } when unchecked, not disabled, and invalid', () => {
    const checked = false;
    const disabled = false;
    const invalid = true;

    const { fill, hover } = getRadioFillVariables(
      checked,
      disabled,
      invalid,
      defaultTheme.colors
    );

    expect(fill).toBe(defaultTheme.colors.danger);
    expect(hover).toBe(defaultTheme.colors.danger);
  });

  it('returns { fill: danger } when checked, not disabled, and invalid', () => {
    const checked = true;
    const disabled = false;
    const invalid = true;

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      invalid,
      defaultTheme.colors
    );

    expect(fill).toBe(defaultTheme.colors.danger);
  });

  it('returns { fill: grayDarker, hover: grayDarker } when unchecked, not disabled, and valid', () => {
    const checked = false;
    const disabled = false;
    const invalid = false;

    const { fill, hover } = getRadioFillVariables(
      checked,
      disabled,
      invalid,
      defaultTheme.colors
    );

    expect(fill).toBe(defaultTheme.colors.grayDarker);
    expect(hover).toBe(defaultTheme.colors.grayDarker);
  });
});
