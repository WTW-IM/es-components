/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import isSameDay from 'date-fns/is_same_day';
import getYear from 'date-fns/get_year';
import MockDate from 'mockdate';

import DatePicker from './DatePicker';

const dateSelected = jest.fn();

function getInstance(props) {
  const pickerProps = { dateSelected, ...props };
  return shallow(<DatePicker {...pickerProps } />);
}

describe('when the starting selection mode is year', () => {
  beforeEach(() => {
    MockDate.set('4/1/2017');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('sets the currentlySelectedDate to the current day unless startingYear prop is specified', () => {
    const instance = getInstance();
    expect(isSameDay(instance.state('currentlySelectedDate'), new Date())).toBe(true);
  });

  it('sets the currentlySelectedDate year to the specified startingYear prop', () => {
    const instance = getInstance({ startingYear: 2005 });

    expect(getYear(instance.state('currentlySelectedDate'))).toBe(2005);
  });

  it('it goes back 120 years by default', () => {
    const instance = getInstance({ startingYear: 2005 });

    const chunks = instance.state('yearChunks');
    const firstYearOfFirstChunk = chunks[0][0];

    expect(firstYearOfFirstChunk).toBe(2005 - 119);
  });

  it('it goes back the provided descentAmount of years', () => {
    const instance = getInstance({ startingYear: 2005, descentAmount: 10 });

    const chunks = instance.state('yearChunks');
    const firstYearOfFirstChunk = chunks[0][0];

    expect(firstYearOfFirstChunk).toBe(2005 - 9);
  });

  it('creates chunks that are 12 items long', () => {
    const instance = getInstance({ startingYear: 2005 });

    const chunks = instance.state('yearChunks');
    expect(chunks[0].length).toBe(12);
  });
});
