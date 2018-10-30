/* eslint-env jest */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Dropdown from './Dropdown';

const options = [
  {
    optionText: 'Test 1',
    optionValue: '1'
  },
  {
    optionText: 'Test 2',
    optionValue: '2'
  },
  {
    optionText: 'Test 3',
    optionValue: '3'
  }
];

it('executes the passed in "onChange" function', () => {
  const onChange = jest.fn();
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <Dropdown labelText="Test" options={options} onChange={onChange} />
    </ThemeProvider>
  );
  fireEvent.change(container.querySelector('select'), {
    target: { value: '1' }
  });
  expect(onChange).toHaveBeenCalled();
});

it('executes the passed in "onBlur" function', () => {
  const onBlur = jest.fn();
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <Dropdown labelText="test" options={options} onBlur={onBlur} />
    </ThemeProvider>
  );

  const select = container.querySelector('select');

  fireEvent.focus(select);
  fireEvent.blur(select);

  expect(onBlur).toHaveBeenCalled();
});

it('does not render the first option when includeDefaultFirstOption is false', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Dropdown
        options={options}
        firstOptionDisplayText="first"
        includeDefaultFirstOption={false}
      />
    </ThemeProvider>
  );
  expect(queryByText('first')).toBeNull();
});

it('renders the text of the first option as the firstOptionDisplayText prop value', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Dropdown options={options} firstOptionDisplayText="first" />
    </ThemeProvider>
  );

  expect(queryByText('first')).not.toBeNull();
});
