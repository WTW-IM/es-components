/* eslint-env jest */
import React from 'react';
import viaTheme from 'es-components-via-theme';

import { fireEvent } from '@testing-library/react';
import Incrementer from './Incrementer';
import { renderWithTheme } from '../../util/test-utils';

const valueUpdated = jest.fn();

beforeAll(() =>
  jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
);
afterAll(() => React.useEffect.mockRestore());

function createIncrementer(props) {
  return (
    <Incrementer {...props} onValueUpdated={valueUpdated} theme={viaTheme} />
  );
}

it('when decrement button is clicked the displayed value is decreased by decrementAmount', () => {
  const { container, queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      decrementAmount: 5
    })
  );
  container.querySelectorAll('button')[0].click();

  expect(queryByDisplayValue('-5')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(-5);
});

it('when decrement button is clicked the displayed value does not exceed the lowerThreshold', () => {
  const { container, queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      decrementAmount: 5,
      lowerThreshold: 3,
      startingValue: 6
    })
  );
  container.querySelectorAll('button')[0].click();

  expect(queryByDisplayValue('3')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when increment button is clicked, the displayed value is increased by incrementAmount', () => {
  const { container, queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      incrementAmount: 2
    })
  );
  container.querySelectorAll('button')[1].click();

  expect(queryByDisplayValue('2')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(2);
});

it('when increment button is clicked, the displayed value does not exceed the upperThreshold', () => {
  const { container, queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      incrementAmount: 3,
      upperThreshold: 8,
      startingValue: 6
    })
  );
  container.querySelectorAll('button')[1].click();

  expect(queryByDisplayValue('8')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(8);
});

it('disables decrementation button when current value equals lowerThreshold', () => {
  const { container } = renderWithTheme(
    createIncrementer({
      startingValue: 2,
      lowerThreshold: 0
    })
  );
  const decrementButton = container.querySelectorAll('button')[0];
  decrementButton.click();
  decrementButton.click();
  expect(decrementButton).toBeDisabled();
});

it('disables incrementation button when current value equals upperThreshold', () => {
  const { container } = renderWithTheme(
    createIncrementer({
      startingValue: 8,
      upperThreshold: 10
    })
  );
  const incrementButton = container.querySelectorAll('button')[1];
  incrementButton.click();
  incrementButton.click();
  expect(incrementButton).toBeDisabled();
});

it('when a non-numeric value is entered the incrementer resets to 0', () => {
  const { queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      startingValue: 6
    })
  );

  const input = queryByDisplayValue('6');
  input.value = 'hi';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByDisplayValue('0')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(0);
});

it('when a non-numeric value is entered the incrementer resets to lowerThreshold when available', () => {
  const { queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      startingValue: 6,
      lowerThreshold: 3
    })
  );

  const input = queryByDisplayValue('6');
  input.value = 'hi';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByDisplayValue('3')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when a value is entered that exceeds the upperThreshold, it resets to upperThreshold', () => {
  const { queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      upperThreshold: 10
    })
  );

  const input = queryByDisplayValue('0');
  input.value = '25';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByDisplayValue('10')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(10);
});

it('when a value is entered that exceeds the lowerThreshold, it resets to lowerThreshold', () => {
  const { queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      lowerThreshold: 3,
      startingValue: 5
    })
  );

  const input = queryByDisplayValue('5');
  input.value = '1';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByDisplayValue('3')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when the lowerThreshold is 0, negative numbers should reset to 0', () => {
  const { queryByDisplayValue } = renderWithTheme(
    createIncrementer({
      lowerThreshold: 0,
      startingValue: 5
    })
  );

  const input = queryByDisplayValue('5');
  input.value = '-1';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByDisplayValue('0')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(0);
});
