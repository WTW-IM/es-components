import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import viaTheme from 'es-components-via-theme';

import Dropdown from './Dropdown';
import { renderWithTheme } from '../../util/test-utils';

test.each([
  {
    selectedOption: null,
    value: null,
    defaultValue: null,
    hasPlaceholderStyle: true
  },
  {
    selectedOption: null,
    value: 'option 2',
    defaultValue: null,
    hasPlaceholderStyle: false
  },
  {
    selectedOption: 'option 1',
    value: null,
    defaultValue: null,
    hasPlaceholderStyle: false
  },
  {
    selectedOption: null,
    value: null,
    defaultValue: 'option 2',
    hasPlaceholderStyle: false
  }
])(
  'renders a dropdown button with appropriate color style',
  async ({ selectedOption, defaultValue, value, hasPlaceholderStyle }) => {
    const valueProp = value ? { value } : {};
    const defaultValueProp = defaultValue ? { defaultValue } : {};

    renderWithTheme(
      <Dropdown {...{ ...valueProp, ...defaultValueProp }}>
        <option value="">Please select an option...</option>
        <option value="option 1">Option 1</option>
        <option value="option 2">Option 2</option>
      </Dropdown>
    );

    const dropdown = await screen.findByRole('combobox');
    if (selectedOption) {
      await userEvent.selectOptions(dropdown, selectedOption);
    }

    const expectedStyle = hasPlaceholderStyle
      ? `color: ${viaTheme.colors.gray7};`
      : `color: ${viaTheme.colors.black};`;
    expect(dropdown).toHaveStyle(expectedStyle);
  }
);
