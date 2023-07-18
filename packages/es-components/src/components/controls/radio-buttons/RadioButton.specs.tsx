import 'jest-styled-components';
import React from 'react';
import * as CSS from 'csstype';
import { screen } from '@testing-library/react';
// using a different name for `css` so prettier doesn't mess with css selectors
import { css as cssStyled } from 'styled-components';
import { renderWithTheme } from '../../util/test-utils';
import RadioButton, { RadioDisplay, RadioInput } from './RadioButton';
import ValidationContext from '../ValidationContext';
import { ValidationStyleType } from 'es-components-shared-types';
import viaTheme from 'es-components-via-theme';
import noop from '../../util/noop';
import { lighten } from '../../util/colors';

describe('RadioButton colors', () => {
  interface ColorTest {
    disabled: boolean;
    checked: boolean;
    validationState: ValidationStyleType;
    expectedColor: CSS.Property.BorderColor;
  }

  test.each<ColorTest>([
    {
      disabled: false,
      checked: false,
      validationState: 'default',
      expectedColor: viaTheme.validationTextColor.default
    },
    {
      disabled: true,
      checked: false,
      validationState: 'default',
      expectedColor: viaTheme.validationTextColor.default
    },
    {
      disabled: false,
      checked: true,
      validationState: 'default',
      expectedColor: viaTheme.colors.primary
    },
    {
      disabled: true,
      checked: true,
      validationState: 'default',
      expectedColor: viaTheme.colors.primary
    },
    {
      disabled: false,
      checked: false,
      validationState: 'warning',
      expectedColor: viaTheme.validationTextColor.warning
    },
    {
      disabled: true,
      checked: false,
      validationState: 'warning',
      expectedColor: viaTheme.validationTextColor.warning
    },
    {
      disabled: false,
      checked: true,
      validationState: 'warning',
      expectedColor: viaTheme.validationTextColor.warning
    },
    {
      disabled: true,
      checked: true,
      validationState: 'warning',
      expectedColor: viaTheme.validationTextColor.warning
    }
  ])(
    `renders correct colors for { disabled: $disabled, checked: $checked, validationState: '$validationState' }`,
    async ({ disabled, checked, validationState, expectedColor }) => {
      const disabledColor = viaTheme.colors.gray5;
      const expectedHoverColor = lighten(expectedColor, 40);
      renderWithTheme(
        <ValidationContext.Provider value={validationState}>
          <RadioButton
            {...{ disabled, checked, onChange: noop, id: 'test-radio' }}
          >
            Option
          </RadioButton>
        </ValidationContext.Provider>
      );

      const radio = await screen.findByRole('radio');

      expect(radio).toHaveStyleRule('border-color', expectedColor, {
        modifier: cssStyled`~ ${RadioDisplay}`
      });

      expect(radio).toHaveStyleRule('background-color', expectedColor, {
        modifier: cssStyled`:checked ~ ${RadioDisplay}:before`
      });

      expect(radio).toHaveStyleRule('border-color', disabledColor, {
        modifier: cssStyled`&&:disabled ~ ${RadioDisplay}`
      });

      expect(radio).toHaveStyleRule('background-color', disabledColor, {
        modifier: cssStyled`&&:disabled:checked ~ ${RadioDisplay}:before`
      });

      const label = await screen.findByText('Option', {
        selector: 'label'
      });
      expect(label).toHaveStyleRule('background-color', expectedHoverColor, {
        modifier: cssStyled`&:hover > ${RadioInput}:not(:disabled):not(:checked) ~ ${RadioDisplay}:before`
      });
      expect(label).toMatchSnapshot();
    }
  );
});
