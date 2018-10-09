/* eslint-env jest */
/* eslint-disable max-len */

import React from 'react';
import { renderWithTheme } from 'styled-enzyme';
import viaTheme from 'es-components-via-theme';

import getRadioFillVariables from './radio-fill-variables';
import { RadioButton } from './RadioButton';

describe('RadioButton component', () => {
  it('renders as expected', () => {
    const tree = renderWithTheme(
      <RadioButton id="test" optionText="test" name="rad" theme={viaTheme} />
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('getRadioFillVariables', () => {
  it('returns { fill: gray5, hover: white } when unchecked, disabled, and valid', () => {
    const checked = false;
    const disabled = true;
    const validationState = 'default';

    const { fill, hover } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.gray5);
    expect(hover).toBe(viaTheme.colors.white);
  });

  it('returns { fill: info } when checked, not disabled, and valid', () => {
    const checked = true;
    const disabled = false;
    const validationState = 'default';

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.info);
  });

  it('returns { fill: gray5 } when checked, disabled, and valid', () => {
    const checked = true;
    const disabled = true;
    const validationState = 'default';

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.gray5);
  });

  it('returns { fill: danger, hover: gray8 } when unchecked, not disabled, and invalid', () => {
    const checked = false;
    const disabled = false;
    const validationState = 'danger';

    const { fill, hover } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.danger);
    expect(hover).toBe(viaTheme.colors.gray8);
  });

  it('returns { fill: info } when checked, not disabled, and invalid', () => {
    const checked = true;
    const disabled = false;
    const validationState = 'danger';

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.info);
  });

  it('returns { fill: gray8, hover: gray8 } when unchecked, not disabled, and valid', () => {
    const checked = false;
    const disabled = false;
    const validationState = 'default';

    const { fill, hover } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.gray8);
    expect(hover).toBe(viaTheme.colors.gray8);
  });
});
