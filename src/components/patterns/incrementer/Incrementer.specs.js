/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Button from '../../controls/buttons/Button';
import { Incrementer } from './Incrementer';

describe('Incrementer component', () => {
  let incrementer;
  let valueUpdated;

  beforeEach(() => {
    valueUpdated = jest.fn();

    incrementer = mount(
      <Incrementer
        startingValue={5}
        incrementAmount={5}
        upperThreshold={20}
        decrementAmount={5}
        lowerThreshold={0}
        onValueUpdated={valueUpdated}
      />
    );
  });

  describe('when decrement button is clicked', () => {
    beforeEach(() => {
      incrementer
        .find(Button)
        .first()
        .simulate('click');
    });

    it('value is decreased by decrementAmount', () => {
      expect(incrementer.state('value')).toBe(0);
    });

    it('calls onValueUpdated prop with decreased value', () => {
      expect(valueUpdated.mock.calls[0][0]).toBe(0);
    });
  });

  describe('when increment button is clicked', () => {
    beforeEach(() => {
      incrementer
        .find(Button)
        .last()
        .simulate('click');
    });

    it('value is increased by incrementAmount', () => {
      expect(incrementer.state('value')).toBe(10);
    });

    it('calls onValueUpdated prop with increased value', () => {
      expect(valueUpdated.mock.calls[0][0]).toBe(10);
    });
  });

  it('disables decrementation button when current value equals lowerThreshold', () => {
    expect(incrementer.state('decrementButtonDisabled')).toBe(false);

    incrementer.setProps({ startingValue: 0 });

    expect(incrementer.state('decrementButtonDisabled')).toBe(true);
  });

  it('disables incrementation button when current value equals upperThreshold', () => {
    expect(incrementer.state('incrementButtonDisabled')).toBe(false);

    incrementer.setProps({ startingValue: 20 });

    expect(incrementer.state('incrementButtonDisabled')).toBe(true);
  });
});
