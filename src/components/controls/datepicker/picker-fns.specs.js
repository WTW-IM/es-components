/* eslint-env jest */
import React from 'react';
import { range, rangeRight } from 'lodash';

import EmptyPickerCell from './EmptyPickerCell';
import * as dateConstants from './date-constants';
import * as picker from './picker-fns.js';

it('getYearChunkIndex returns the correct index for a specified year', () => {
  const chosenYear = 2019;
  const yearChunks = [
    [2010, 2011, 2012, 2013],
    [2014, 2015, 2016, 2017],
    [2018, 2019, 2020, 2021]
  ];

  const yearChunkIndex = picker.getYearChunkIndex(yearChunks, chosenYear);

  expect(yearChunkIndex).toBe(2);
});

describe('getGridSetValuesForDaySelection', () => {
  it('returns set with range of days as the included value', () => {
    const currentlySelectedDate = new Date(2017, 0, 1);

    const gridSetValues = picker.getGridSetValuesForDaySelection(currentlySelectedDate);
    expect(gridSetValues.included).toEqual(range(1, 32));
  });

  it('returns range of days from Sunday to the weekday of the provided month start as prependedContent', () => {
    const currentlySelectedDate = new Date(2017, 0);
    const todaysDate = new Date(2017, 4, 1);

    const gridSetValues = picker.getGridSetValuesForDaySelection(currentlySelectedDate, todaysDate, 3);

    expect(gridSetValues.prependedContent).toEqual(range(0, 3).map(x => <EmptyPickerCell key={x} />));
  });

  it('returns range of days from the provided month end day to Saturday as appendedContent', () => {
    const currentlySelectedDate = new Date(2017, 0);
    const todaysDate = new Date(2017, 4, 1);


    const gridSetValues = picker.getGridSetValuesForDaySelection(currentlySelectedDate, todaysDate, 0, 3);

    expect(gridSetValues.appendedContent).toEqual(range(0, 3).map(x => <EmptyPickerCell key={x} />));
  });

  it('returns Sunday through Friday abbreviations as subheader elements', () => {
    const currentlySelectedDate = new Date(2017, 0);

    const gridSetValues = picker.getGridSetValuesForDaySelection(currentlySelectedDate);

    expect(gridSetValues.subHeaderItems).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
  });
});

describe('getDefaultDescentAmountForSelectionMode function', () => {
  it('returns 12 when the selectionMode is "month"', () => {
    expect(picker.getDefaultDescentAmountForSelectionMode('month')).toBe(12);
  });

  it('returns 120 when the selection mode is "year"', () => {
    expect(picker.getDefaultDescentAmountForSelectionMode('year')).toBe(120);
  });
});

describe('getStartingSelectionMode function', () => {
  describe('when the passed in selection mode is "year"', () => {
    it('returns "year"', () => {
      expect(picker.getStartingSelectionMode('year')).toBe('year');
    });
  });

  describe('when the passed in selectionMode is "month"', () => {
    it('returns "month" when the descentAmount is 12 or more', () => {
      expect(picker.getStartingSelectionMode('month', 12)).toBe('month');
      expect(picker.getStartingSelectionMode('month', 16)).toBe('month');
    });

    it('returns "day" when the descent amount is less than 12', () => {
      expect(picker.getStartingSelectionMode('month', 6)).toBe('day');
    });
  });
});

describe('getYearsForSelectionMode function', () => {
  describe('when the selectionMode is "year"', () => {
    it('returns a range of the current year - the descent amount', () => {
      const yearRange = picker.getYearsForSelectionMode('year', 2017, 120);

      expect(yearRange).toEqual(rangeRight(2017, 2017 - 120));
    });
  });

  describe('when the selectionMode is "month"', () => {
    it('returns an array of only the current year when the descent amount is less than 12', () => {
      const yearRange = picker.getYearsForSelectionMode('month', 2017, 6);
      expect(yearRange).toEqual([2017]);
    });

    it('returns a range of the current year and the number of years determined by a descent amount greater than 12', () => {
      const yearRange = picker.getYearsForSelectionMode('month', 2017, 24);
      expect(yearRange).toEqual([2015, 2016, 2017]);
    });
  });
});

it('returns true when the years match', () => {
  expect(picker.areYearsEqual(2017, 2017)).toBe(true);
});

it('returns false when the years do not match', () => {
  expect(picker.areYearsEqual(2017, 2016)).toBe(false);
});

describe('getMonthsByYear', () => {
  it('creates a map of years to months', () => {
    const monthGroups = picker.getMonthsByYear([2017, 2016], 2017);

    expect(monthGroups.length).toBe(2);
  });

  it('sets the months', () => {
    const monthGroups = picker.getMonthsByYear([2017, 2016], 2017);

    expect(monthGroups[0].months).toEqual(dateConstants.MONTHS);
    expect(monthGroups[1].months).toEqual(dateConstants.MONTHS);
  });

  it('sets the year as selected', () => {
    const monthGroups = picker.getMonthsByYear([2017, 2016], 2016);

    expect(monthGroups[1].selected).toBe(true);
  });
});

describe('splitMonthsByYears', () => {
  let years;
  let today;
  let numberOfMonths;
  let monthsSplit;

  beforeEach(() => {
    years = [2017, 2016, 2015];
    today = new Date(2017, 4, 4);
    numberOfMonths = 22;
    monthsSplit = picker.splitMonthsByYears(years, numberOfMonths, today);
  });

  it('returns the number of the month in the year as the number of months for the current year', () => {
    expect(monthsSplit['2017']).toBe(4);
  });

  it('returns 12 for every year in which there are still more than 12 months left', () => {
    expect(monthsSplit['2016']).toBe(12);
  });

  it('returns the remaining number of months for the last year passed', () => {
    expect(monthsSplit['2015']).toBe(6);
  });
});

describe('getTotalSelectableMonths', () => {
  it('returns the descentAmount as the totalSelectableMonths amount when the selection mode is month', () => {
    const totalSelectableMonths = picker.getTotalSelectableMonths('month', new Date(2017, 4), 24);
    expect(totalSelectableMonths).toBe(24);
  });

  it('returns the total number of months inclusive of the descendFromDate', () => {
    const totalSelectableMonths = picker.getTotalSelectableMonths('year', new Date(2017, 4), null, 3);
    expect(totalSelectableMonths).toBe(28);
  });
});

describe('determineInitialDate', () => {
  it('returns the parsed date when preselectedDate is not undefined', () => {
    const initializedDateValues = picker.determineInitialStateOfDates('1/1/2017', null, null);
    expect(initializedDateValues.currentlySelectedDate).toEqual(new Date(2017, 0, 1));
  });

  it('returns the selected date parts when preselectedDate is not undefined', () => {
    const { selectedDateParts } = picker.determineInitialStateOfDates('1/1/2017', null, null);
    expect(selectedDateParts.selectedYear).toBe(2017);
    expect(selectedDateParts.selectedMonth).toBe('Jan');
    expect(selectedDateParts.selectedMonthIndex).toBe(0);
    expect(selectedDateParts.selectedDay).toBe(1);
  });

  it('returns the current day of the starting year when preselectedDate is undefined and startingYear is not undefined', () => {
    const { currentlySelectedDate } = picker.determineInitialStateOfDates(null, 2005, new Date(2017, 0));
    expect(currentlySelectedDate).toEqual(new Date(2005, 0));
  });

  it('returns the date passed as the todaysDate parameter as the currentlySelectedDate', () => {
    const { currentlySelectedDate } = picker.determineInitialStateOfDates(null, null, new Date(2017, 0));
    expect(currentlySelectedDate).toEqual(new Date(2017, 0));
  });
});

describe('getPreviousSelectionMode', () => {
  it('returns "year" when currentSelectionMode', () => {
    expect(picker.getPreviousSelectionMode('month')).toBe('year');
  });

  it('returns "day" when currentSelectionMode is "day"', () => {
    expect(picker.getPreviousSelectionMode('day')).toBe('month');
  });

  it('returns "decade" when currentSelectionMode is not "month" or "day"', () => {
    expect(picker.getPreviousSelectionMode('year')).toBe('decade');
  });
});
