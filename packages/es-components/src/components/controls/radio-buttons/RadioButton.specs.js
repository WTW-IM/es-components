/* eslint-env jest */
/* eslint-disable max-len */

import viaTheme from 'es-components-via-theme';

import getRadioFillVariables from './radio-fill-variables';

describe('getRadioFillVariables', () => {
  it('returns { fill: gray5 } when unchecked, disabled, and valid', () => {
    const checked = false;
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

  it('returns { fill: primary } when checked, not disabled, and valid', () => {
    const checked = true;
    const disabled = false;
    const validationState = 'default';

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors.primary);
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

  it('returns { fill: danger, hover: gray3 } when unchecked, not disabled, and invalid', () => {
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
    expect(hover).toBe(viaTheme.colors.gray3);
  });

  it('returns { fill: danger } when checked, not disabled, and invalid', () => {
    const checked = true;
    const disabled = false;
    const validationState = 'danger';

    const { fill } = getRadioFillVariables(
      checked,
      disabled,
      validationState,
      viaTheme.colors
    );

    expect(fill).toBe(viaTheme.colors[validationState]);
  });

  it('returns { fill: gray8, hover: gray3 } when unchecked, not disabled, and valid', () => {
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
    expect(hover).toBe(viaTheme.colors.gray3);
  });
});
