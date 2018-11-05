/* eslint-env jest */
import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Incrementer from './Incrementer';

const valueUpdated = jest.fn();

beforeEach(() => {
  valueUpdated.mockClear();
});

function createIncrementer(props) {
  return (
    <ThemeProvider theme={viaTheme}>
      <Incrementer {...props} onValueUpdated={valueUpdated} theme={viaTheme} />
    </ThemeProvider>
  );
}

it('when decrement button is clicked the displayed value is decreased by decrementAmount', () => {
  const { container, queryByValue } = render(
    createIncrementer({
      decrementAmount: 5
    })
  );
  container.getElementsByClassName('decrement-button')[0].click();
  expect(queryByValue('-5')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(-5);
});

it('when increment button is clicked, the displayed value is increased by incrementAmount', () => {
  const { container, queryByValue } = render(
    createIncrementer({
      incrementAmount: 2
    })
  );
  container.getElementsByClassName('increment-button')[0].click();
  expect(queryByValue('2')).not.toBeNull();
  expect(valueUpdated).toHaveBeenCalledWith(2);
});

it('disables decrementation button when current value equals lowerThreshold', () => {
  const { container } = render(
    createIncrementer({
      startingValue: 2,
      lowerThreshold: 0
    })
  );
  const decrementButton = container.getElementsByClassName(
    'decrement-button'
  )[0];
  decrementButton.click();
  decrementButton.click();
  expect(decrementButton).toBeDisabled();
});

it('disables incrementation button when current value equals upperThreshold', () => {
  const { container } = render(
    createIncrementer({
      startingValue: 8,
      upperThreshold: 10
    })
  );
  const incrementButton = container.getElementsByClassName(
    'increment-button'
  )[0];
  incrementButton.click();
  incrementButton.click();
  expect(incrementButton).toBeDisabled();
});
