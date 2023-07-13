import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Incrementer, { IncrementerProps } from './Incrementer';
import { renderWithTheme } from '../../util/test-utils';

const valueUpdated = jest.fn();

beforeAll(() =>
  jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
);
afterAll(() => (React.useEffect as unknown as jest.SpyInstance).mockRestore());

function TestIncrementer(props: IncrementerProps) {
  return <Incrementer {...props} onValueUpdated={valueUpdated} />;
}

it('when decrement button is clicked the displayed value is decreased by decrementAmount', async () => {
  const user = userEvent.setup();
  renderWithTheme(<TestIncrementer decrementAmount={5} />);
  await user.click(await screen.findByRole('button', { name: /Decrement/ }));

  expect(await screen.findByDisplayValue('-5')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(-5);
});

it('when decrement button is clicked the displayed value does not exceed the lowerThreshold', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <TestIncrementer
      {...{
        decrementAmount: 5,
        lowerThreshold: 3,
        startingValue: 6
      }}
    />
  );
  await user.click(await screen.findByRole('button', { name: /Decrement/ }));

  expect(await screen.findByDisplayValue('3')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when increment button is clicked, the displayed value is increased by incrementAmount', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <TestIncrementer
      {...{
        incrementAmount: 2
      }}
    />
  );
  await user.click(await screen.findByRole('button', { name: /Increment/ }));

  expect(await screen.findByDisplayValue('2')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(2);
});

it('when increment button is clicked, the displayed value does not exceed the upperThreshold', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <TestIncrementer
      {...{
        incrementAmount: 3,
        upperThreshold: 8,
        startingValue: 6
      }}
    />
  );
  await user.click(await screen.findByRole('button', { name: /Increment/ }));

  expect(await screen.findByDisplayValue('8')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(8);
});

it('disables decrementation button when current value equals lowerThreshold', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <TestIncrementer
      {...{
        startingValue: 2,
        lowerThreshold: 0
      }}
    />
  );
  const decrementButton = await screen.findByRole('button', {
    name: /Decrement value/
  });
  await user.click(decrementButton);
  await user.click(decrementButton);

  expect(decrementButton).toBeDisabled();
});

it('disables incrementation button when current value equals upperThreshold', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <TestIncrementer
      {...{
        startingValue: 8,
        upperThreshold: 10
      }}
    />
  );
  const incrementButton = await screen.findByRole('button', {
    name: /Increment value/
  });
  await user.click(incrementButton);
  await user.click(incrementButton);

  expect(incrementButton).toBeDisabled();
});

it('when a non-numeric value is entered the incrementer resets to 0', async () => {
  renderWithTheme(
    <TestIncrementer
      {...{
        startingValue: 6
      }}
    />
  );

  const input = await screen.findByDisplayValue('6');
  await userEvent.clear(input);
  await userEvent.type(input, 'hi');
  await userEvent.tab();

  expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(0);
});

it('when a non-numeric value is entered the incrementer resets to lowerThreshold when available', async () => {
  renderWithTheme(
    <TestIncrementer
      {...{
        startingValue: 6,
        lowerThreshold: 3
      }}
    />
  );

  const input = await screen.findByDisplayValue('6');
  await userEvent.clear(input);
  await userEvent.type(input, 'hi');
  await userEvent.tab();

  expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when a value is entered that exceeds the upperThreshold, it resets to upperThreshold', async () => {
  renderWithTheme(
    <TestIncrementer
      {...{
        upperThreshold: 10
      }}
    />
  );

  const input = await screen.findByDisplayValue('0');
  await userEvent.clear(input);
  await userEvent.type(input, '25');
  await userEvent.tab();

  expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(10);
});

it('when a value is entered that is below the lowerThreshold, it resets to lowerThreshold', async () => {
  renderWithTheme(
    <TestIncrementer
      {...{
        lowerThreshold: 3,
        startingValue: 5
      }}
    />
  );

  const input = await screen.findByDisplayValue('5');
  await userEvent.clear(input);
  await userEvent.type(input, '1');
  await userEvent.tab();

  expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(3);
});

it('when the lowerThreshold is 0, negative numbers should reset to 0', async () => {
  renderWithTheme(
    <TestIncrementer
      {...{
        lowerThreshold: 0,
        startingValue: 5
      }}
    />
  );

  const input = await screen.findByDisplayValue('5');
  await userEvent.clear(input);
  await userEvent.type(input, '-1');
  await userEvent.tab();

  expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  expect(valueUpdated).toHaveBeenCalledWith(0);
});
