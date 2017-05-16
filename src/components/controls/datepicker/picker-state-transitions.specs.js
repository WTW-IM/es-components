/* eslint-env jest */
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';
import getDate from 'date-fns/get_date';

import pickerStateTransitions from './picker-state-transitions';

it('setToPreviousYearChunk returns state with currentYearChunkIndex set to previous year chunk index', () => {
  const currentYearChunkIndex = 1;
  const state = { currentYearChunkIndex };

  const newState = pickerStateTransitions.setToPreviousYearChunk(state);

  expect(newState.currentYearChunkIndex).toBe(0);
});

it('setToNextYearChunk returns state with currentYearChunkIndex set to next year chunk index', () => {
  const currentYearChunkIndex = 1;
  const state = { currentYearChunkIndex };

  const newState = pickerStateTransitions.setToNextYearChunk(state);

  expect(newState.currentYearChunkIndex).toBe(2);
});

it('setToPreviousYear returns state with currentlySelectedDate set to previous year', () => {
  const currentlySelectedDate = new Date(2017, 0, 1);
  const state = { currentlySelectedDate };

  const newState = pickerStateTransitions.setToPreviousYear(state);

  expect(getYear(newState.currentlySelectedDate)).toBe(2016);
});

it('setToNextYear returns state with currentlySelectedDate set to next year', () => {
  const currentlySelectedDate = new Date(2017, 0, 1);
  const state = { currentlySelectedDate };

  const newState = pickerStateTransitions.setToNextYear(state);

  expect(getYear(newState.currentlySelectedDate)).toBe(2018);
});

describe('yearSelected', () => {
  it('sets the currentlySelectedDate to the selected year', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.yearSelected(state, 2015);

    expect(getYear(newState.currentlySelectedDate)).toBe(2015);
  });

  it('sets the selection mode to "month"', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.yearSelected(state, 2015);

    expect(newState.selectionMode).toBe('month');
  });

  it('sets the currentlySelectedYear to the selected year', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.yearSelected(state, 2015);

    expect(newState.selectedYear).toBe(2015);
  });
});

describe('setToYearSelection function', () => {
  let newState;

  beforeEach(() => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const yearChunks = [
      [2015, 2016],
      [2017, 2018],
      [2019, 2020]
    ];
    const state = { currentlySelectedDate, yearChunks, currentYearChunkIndex: 0 };

    newState = pickerStateTransitions.setToYearSelection(state);
  });

  it('returns state with the correct year chunk for a the currentlySelectedDate', () => {
    expect(newState.currentYearChunkIndex).toBe(1);
  });

  it('returns state with the selectionMode set to "year"', () => {
    expect(newState.selectionMode).toBe('year');
  });
});

describe('setToPreviousMonth function', () => {
  it('returns state with the month set to the previous month', () => {
    const currentlySelectedDate = new Date(2017, 1, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.setToPreviousMonth(state);

    expect(getMonth(newState.currentlySelectedDate)).toBe(0);
  });

  it('returns state with the currentlySelectedDate rolled back to December of previous year when current month is January', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.setToPreviousMonth(state);

    expect(getYear(newState.currentlySelectedDate)).toBe(2016);
  });
});

describe('setToNextMonth function', () => {
  it('returns state with the month set to the next month', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.setToNextMonth(state);

    expect(getMonth(newState.currentlySelectedDate)).toBe(1);
  });

  it('returns state with currentlySelectedDate rolled forward to January of next year when current month is December', () => {
    const currentlySelectedDate = new Date(2017, 11, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.setToNextMonth(state);

    expect(getYear(newState.currentlySelectedDate)).toBe(2018);
  });
});

describe('monthSelected function', () => {
  it('sets the selectionMode to "day"', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.monthSelected(state, 'Mar');

    expect(newState.selectionMode).toBe('day');
  });

  it('returns state with currentlySelectedDate set to the selected month', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.monthSelected(state, 'Mar');

    expect(getMonth(newState.currentlySelectedDate)).toBe(2);
  });

  it('return state with currentlySelectedDate set to the first of the selected month', () => {
    const currentlySelectedDate = new Date(2017, 0, 2);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.monthSelected(state, 'Mar');

    expect(getDate(newState.currentlySelectedDate)).toBe(1);
  });

  it('sets the monthStartDay to the correct day of the week', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.monthSelected(state, 'Mar');

    // March 2017 starts on a Wednesday
    expect(newState.monthStartDay).toBe(3);
  });

  it('sets the monthEndDay to the correct day of the week', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.monthSelected(state, 'Mar');

    // March 2017 ends on a Friday
    expect(newState.monthEndDay).toBe(5);
  });
});

describe('daySelected', () => {
  it('sets the day to the day selected', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.daySelected(state, 4);

    expect(getDate(newState.currentlySelectedDate)).toBe(4);
  });

  it('sets the dateSelectionComplete to true', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);
    const state = { currentlySelectedDate };

    const newState = pickerStateTransitions.daySelected(state, 4);

    expect(newState.dateSelectionComplete).toBe(true);
  });
});
