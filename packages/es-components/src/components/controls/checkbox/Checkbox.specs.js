/* eslint-env jest */

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Checkbox from './Checkbox';

beforeEach(cleanup);

it('executes onClick prop when label is clicked', () => {
  const onClick = jest.fn();

  const { getByLabelText } = render(
    <ThemeProvider theme={viaTheme}>
      <Checkbox name="test" labelText="test label" onClick={onClick} />
    </ThemeProvider>
  );

  getByLabelText('test label').click();
  expect(onClick).toHaveBeenCalled();
});

it('cannot be clicked when disabled', () => {
  const onClick = jest.fn();
  const { container, getByLabelText } = render(
    <ThemeProvider theme={viaTheme}>
      <Checkbox name="test" labelText="test label" onClick={onClick} disabled />
    </ThemeProvider>
  );

  getByLabelText('test label').click();
  expect(onClick).not.toHaveBeenCalled();
  expect(container.querySelector('input')).toBeDisabled();
});

it('will render additional help when passed', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Checkbox
        name="test"
        labelText="test label"
        onClick={jest.fn()}
        additionalHelpContent="help me"
      />
    </ThemeProvider>
  );

  expect(queryByText('help me')).not.toBeNull();
});

it('will not render additional help when not passed', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Checkbox name="test" labelText="test label" onClick={jest.fn()} />
    </ThemeProvider>
  );

  expect(queryByText('help me')).toBeNull();
});
