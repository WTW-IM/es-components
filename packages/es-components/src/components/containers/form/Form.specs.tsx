import React from 'react';
import { screen } from '@testing-library/react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { renderWithTheme } from '../../util/test-utils';
import Form, { FormContextProvider, FormContextShape, FormProps } from './Form';
import Textbox from '../../controls/textbox/Textbox';

const TestForm = ({
  originalTheme,
  originalContext,
  formProps
}: {
  originalTheme: Partial<DefaultTheme>;
  originalContext: Partial<FormContextShape>;
  formProps: FormProps;
}) => {
  const theme = { ...viaTheme, ...originalTheme };
  return (
    <ThemeProvider theme={theme}>
      <FormContextProvider value={originalContext}>
        <Form {...formProps}>
          <Textbox name="test" />
        </Form>
      </FormContextProvider>
    </ThemeProvider>
  );
};

test.each<{
  originalTheme: Partial<DefaultTheme>;
  originalContext: Partial<FormContextShape>;
  formProps: FormProps;
  hasFlatStyle: boolean;
}>([
  {
    originalTheme: {},
    originalContext: {},
    formProps: {},
    hasFlatStyle: false
  },
  {
    originalTheme: {
      inputStyles: { ...viaTheme.inputStyles, defaultFormStyle: 'flat' }
    },
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
    originalTheme: {
      inputStyles: { ...viaTheme.inputStyles, defaultFormStyle: 'flat' }
    },
    originalContext: { flat: false },
    formProps: {},
    hasFlatStyle: false
  },
  {
    originalTheme: {
      inputStyles: { ...viaTheme.inputStyles, defaultFormStyle: 'flat' }
    },
    originalContext: {},
    formProps: { flat: false },
    hasFlatStyle: false
  },
  {
    originalTheme: {
      inputStyles: { ...viaTheme.inputStyles, defaultFormStyle: 'default' }
    },
    originalContext: { flat: true },
    formProps: {},
    hasFlatStyle: true
  },
  {
    originalTheme: {
      inputStyles: { ...viaTheme.inputStyles, defaultFormStyle: 'default' }
    },
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

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('textbox').parentElement).toHaveStyle(
      expectedStyle
    );
  }
);
