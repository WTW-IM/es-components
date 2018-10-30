/* eslint-env jest */

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { range } from 'lodash';
import viaTheme from 'es-components-via-theme';
import { ThemeProvider } from 'styled-components';

import RadioGroup from './RadioGroup';

function buildOptions(numberOfOptions, optionIndexToDisable) {
  return range(0, numberOfOptions).map(idx => ({
    optionText: `Option ${idx}`,
    optionValue: idx,
    disabled: idx === optionIndexToDisable
  }));
}

beforeEach(cleanup);

it('renders each radio input as disabled when disableAllOptions is true', () => {
  const options = buildOptions(3);
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <RadioGroup name="test" radioOptions={options} disableAllOptions />
    </ThemeProvider>
  );

  const inputs = container.querySelectorAll('input');

  expect(inputs[0]).toBeDisabled();
  expect(inputs[1]).toBeDisabled();
  expect(inputs[2]).toBeDisabled();
});

it('renders a specific radio input as disabled when that option is set to disabled', () => {
  const options = buildOptions(3, 0);
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <RadioGroup name="test" radioOptions={options} />
    </ThemeProvider>
  );

  const inputs = container.querySelectorAll('input');

  expect(inputs[0]).toBeDisabled();
  expect(inputs[1]).not.toBeDisabled();
  expect(inputs[2]).not.toBeDisabled();
});

it('renders legend when provided', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <RadioGroup
        name="test"
        radioOptions={buildOptions(3)}
        legendContent="Test legend"
      />
    </ThemeProvider>
  );

  expect(queryByText('Test legend')).not.toBeNull();
});

it('renders intro when provided', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <RadioGroup
        name="test"
        radioOptions={buildOptions(3)}
        introContent="Test intro"
      />
    </ThemeProvider>
  );

  expect(queryByText('Test intro')).not.toBeNull();
});

it('renders additional help when provided', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <RadioGroup
        name="test"
        radioOptions={buildOptions(3)}
        additionalHelpContent="Test additional help"
      />
    </ThemeProvider>
  );

  expect(queryByText('Test additional help')).not.toBeNull();
});
