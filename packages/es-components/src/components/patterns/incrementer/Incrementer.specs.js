/* eslint-env jest */
import React from 'react';
import viaTheme from 'es-components-via-theme';

import { fireEvent } from 'react-testing-library';
import Incrementer from './Incrementer';
import { renderWithTheme } from '../../util/test-utils';

const valueUpdated = jest.fn();

beforeAll(() =>
  jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
afterAll(() => React.useEffect.mockRestore());

function createIncrementer(props) {
  return (
    <Incrementer {...props} onValueUpdated={valueUpdated} theme={viaTheme} />
  );
}

it('when decrement button is clicked the displayed value is decreased by decrementAmount', () => {
  const { container, queryByValue } = renderWithTheme(
    createIncrementer({
      decrementAmount: 5
    })
  );
  container.querySelectorAll('button')[0].click();

  expect(queryByValue('-5')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(-5);
});

it('when decrement button is clicked the displayed value does not exceed the lowerThreshold', () => {
  const { container, queryByValue } = renderWithTheme(
    createIncrementer({
      decrementAmount: 5,
      lowerThreshold: 3,
      startingValue: 6
    })
  );
  container.querySelectorAll('button')[0].click();

  expect(queryByValue('3')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when increment button is clicked, the displayed value is increased by incrementAmount', () => {
  const { container, queryByValue } = renderWithTheme(
    createIncrementer({
      incrementAmount: 2
    })
  );
  container.querySelectorAll('button')[1].click();

  expect(queryByValue('2')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(2);
});

it('when increment button is clicked, the displayed value does not exceed the upperThreshold', () => {
  const { container, queryByValue } = renderWithTheme(
    createIncrementer({
      incrementAmount: 3,
      upperThreshold: 8,
      startingValue: 6
    })
  );
  container.querySelectorAll('button')[1].click();

  expect(queryByValue('8')).not.toBeNull();
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
  const { queryByValue } = renderWithTheme(
    createIncrementer({
      startingValue: 6
    })
  );

  const input = queryByValue('6');
  input.value = 'hi';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByValue('0')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(0);
});

it('when a non-numeric value is entered the incrementer resets to lowerThreshold when available', () => {
  const { queryByValue } = renderWithTheme(
    createIncrementer({
      startingValue: 6,
      lowerThreshold: 3
    })
  );

  const input = queryByValue('6');
  input.value = 'hi';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByValue('3')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when a value is entered that exceeds the upperThreshold, it resets to upperThreshold', () => {
  const { queryByValue } = renderWithTheme(
    createIncrementer({
      upperThreshold: 10
    })
  );

  const input = queryByValue('0');
  input.value = '25';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByValue('10')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(10);
});

it('when a value is entered that exceeds the lowerThreshold, it resets to lowerThreshold', () => {
  const { queryByValue } = renderWithTheme(
    createIncrementer({
      lowerThreshold: 3,
      startingValue: 5
    })
  );

  const input = queryByValue('5');
  input.value = '1';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByValue('3')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when the lowerThreshold is 0, negative numbers should reset to 0', () => {
  const { queryByValue } = renderWithTheme(
    createIncrementer({
      lowerThreshold: 0,
      startingValue: 5
    })
  );

  const input = queryByValue('5');
  input.value = '-1';
  fireEvent.change(input);
  fireEvent.blur(input);

  expect(queryByValue('0')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(0);
});
