import React from 'react';
import viaTheme from 'es-components-via-theme';
import { ThemeProvider } from 'styled-components';
import { renderWithTheme } from '../../util/test-utils';
import { screen } from '@testing-library/react';
import Form, { FormContextProvider } from './Form';
import Textbox from '../../controls/textbox/Textbox';

// eslint-disable-next-line react/prop-types
const TestForm = ({ originalTheme, originalContext, formProps }) => (
  <ThemeProvider theme={originalTheme}>
    <FormContextProvider value={originalContext}>
      <Form {...formProps}>
        <Textbox name="test" />
      </Form>
    </FormContextProvider>
  </ThemeProvider>
);

test.each([
  {
    originalTheme: {},
    originalContext: {},
    formProps: {},
    hasFlatStyle: false
  },
  {
    originalTheme: { inputStyles: { defaultFormStyle: 'flat' } },
    originalContext: {},
    formProps: {},
    hasFlatStyle: true
  },
  {
    originalTheme: {},
    originalContext: { flat: true },
    formProps: {},
    hasFlatStyle: true
  },
  {
    originalTheme: {},
    originalContext: {},
    formProps: { flat: true },
    hasFlatStyle: true
  },
  {
    originalTheme: { inputStyles: { defaultFormStyle: 'flat' } },
    originalContext: { flat: false },
    formProps: {},
    hasFlatStyle: false
  },
  {
    originalTheme: { inputStyles: { defaultFormStyle: 'flat' } },
    originalContext: {},
    formProps: { flat: false },
    hasFlatStyle: false
  },
  {
    originalTheme: { inputStyles: { defaultFormStyle: 'default' } },
    originalContext: { flat: true },
    formProps: {},
    hasFlatStyle: true
  },
  {
    originalTheme: { inputStyles: { defaultFormStyle: 'default' } },
    originalContext: {},
    formProps: { flat: true },
    hasFlatStyle: true
  },
  {
    originalTheme: {},
    originalContext: { flat: true },
    formProps: { flat: false },
    hasFlatStyle: false
  },
  {
    originalTheme: {},
    originalContext: { flat: false },
    formProps: { flat: true },
    hasFlatStyle: true
  }
])(
  'gets form default styles from appropriate source',
  ({ originalTheme, originalContext, formProps, hasFlatStyle }) => {
    renderWithTheme(
      <TestForm {...{ originalTheme, originalContext, formProps }} />
    );
    const defaultInputStyles = viaTheme.validationInputColor.default;
    const expectedStyle = hasFlatStyle
      ? `background-color: ${defaultInputStyles.backgroundColorFlat};`
      : `background-color: ${defaultInputStyles.backgroundColor};`;
    expect(screen.getByRole('textbox')).toHaveStyle(expectedStyle);
  }
);
