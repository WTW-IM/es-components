import React from 'react';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';
import getDate from 'date-fns/get_date';
import getDaysInMonth from 'date-fns/get_days_in_month';
import parse from 'date-fns/parse';
import {
  concat,
  findIndex,
  includes,
  map,
  range,
  rangeRight
} from 'lodash';

import PickerButton from './PickerButton';
import EmptyPickerCell from './EmptyPickerCell';
import * as dateConstants from './date-constants';

export function getYearChunkIndex(yearChunks, givenYear) {
  return findIndex(yearChunks, chunk => includes(chunk, givenYear));
}

export function isFirstYearChunk(yearChunkIndex) {
  return yearChunkIndex === 0;
}

export function isLastYearChunk(yearChunks, yearChunkIndex) {
  return yearChunkIndex === yearChunks.length - 1;
}

export function isFirstYearInChunk(yearChunk, year) {
  return yearChunk[0] === year;
}

export function isLastYearInChunk(yearChunk, year) {
  return yearChunk[yearChunk.length - 1] === year;
}

export function getGridSetValuesForDaySelection(date, todaysDate, monthStartDay, monthEndDay, isCurrentMonth) {
  const numberOfDaysInMonth = getDaysInMonth(date);
  const currentDay = getDate(todaysDate);
  const daysRange = isCurrentMonth ? range(1, currentDay + 1) : range(1, numberOfDaysInMonth + 1);

  const disabledDays = isCurrentMonth ?
    rangeRight(numberOfDaysInMonth, currentDay).map(x => <PickerButton key={x} displayed disabled>{x}</PickerButton>) :
    [];


  let beginningOfMonthRange;
  let endOfMonthRange;
  if (monthStartDay !== dateConstants.SUNDAY) {
    beginningOfMonthRange = range(dateConstants.SUNDAY, monthStartDay)
    .map(day => <EmptyPickerCell key={day} />);
  }

  if (monthEndDay !== dateConstants.SATURDAY) {
    endOfMonthRange = range(0, (dateConstants.SATURDAY - monthEndDay))
    .map(day => <EmptyPickerCell key={day} />);
  }

  return {
    prependedContent: beginningOfMonthRange,
    included: daysRange,
    appendedContent: concat(disabledDays, endOfMonthRange),
    subHeaderItems: dateConstants.WEEKDAYS
  };
}

export function getStartingSelectionMode(selectionMode, descentAmount) {
  if (selectionMode === 'month') {
    return descentAmount >= 12 ? selectionMode : 'day';
  }
  return selectionMode;
}

function shouldAddAdditionalYear(descentAmount, totalYears) {
  return descentAmount === 12 || totalYears % 12 !== 0;
}

export function getYearsForSelectionMode(selectionMode, yearToDescendFrom, descentAmount) {
  if (selectionMode === 'month') {
    if (descentAmount >= 12) {
      let totalYears = descentAmount / 12;
      if (shouldAddAdditionalYear(descentAmount, totalYears)) {
        totalYears += 1;
      }
      return rangeRight(yearToDescendFrom, yearToDescendFrom - totalYears);
    }
    return [yearToDescendFrom];
  }

  return rangeRight(yearToDescendFrom, yearToDescendFrom - descentAmount);
}

export function getDefaultDescentAmountForSelectionMode(selectionMode) {
  return selectionMode === 'month' ? 12 : 120;
}

export function areYearsEqual(year, comparativeYear) {
  return year === comparativeYear;
}

export function getMonthsByYear(years, currentYear) {
  return map(years, year => ({
    year,
    months: dateConstants.MONTHS,
    selected: areYearsEqual(year, currentYear)
  }));
}

export function splitMonthsByYears(years, numberOfMonths, todaysDate) {
  const currentYear = getYear(todaysDate);
  return years.reduce((current, year) => {
    const { monthsLeft } = current;
    const isCurrentYear = areYearsEqual(year, currentYear);
    let monthsToDisplayForYear;
    if (isCurrentYear) {
      const currentMonth = getMonth(todaysDate);
      monthsToDisplayForYear = currentMonth;
    } else if (monthsLeft > 12) {
      monthsToDisplayForYear = 12;
    } else {
      monthsToDisplayForYear = monthsLeft;
    }
    return Object.assign(current, {
      [year]: monthsToDisplayForYear,
      monthsLeft: monthsLeft - monthsToDisplayForYear
    });
  }, { monthsLeft: numberOfMonths });
}

export function getTotalSelectableMonths(selectionMode, descendFromDate, descentAmount, numberOfYears) {
  if (selectionMode !== 'year') {
    return descentAmount;
  }
  // remove the months from the current year and add the total number of months returned from getMonth to
  // put the first selectable month to January of the first selectable year
  return (numberOfYears * 12) - (12 - getMonth(descendFromDate));
}

export function determineInitialStateOfDates(preselectedDate, startingYear, todaysDate) {
  if (preselectedDate) {
    const currentlySelectedDate = parse(preselectedDate);
    const selectedMonthIndex = getMonth(currentlySelectedDate);

    const selectedDateParts = {
      selectedYear: getYear(currentlySelectedDate),
      selectedMonth: dateConstants.MONTHS[selectedMonthIndex],
      selectedMonthIndex,
      selectedDay: getDate(currentlySelectedDate)
    };

    return { currentlySelectedDate, selectedDateParts, dateWasPreselected: true };
  } else if (startingYear) {
    const currentlySelectedDate = new Date(startingYear, getMonth(todaysDate));
    return { currentlySelectedDate };
  }

  const currentlySelectedDate = todaysDate;
  return { currentlySelectedDate };
}

export function getPreviousSelectionMode(currentSelectionMode) {
  if (currentSelectionMode === 'month') {
    return 'year';
  } else if (currentSelectionMode === 'day') {
    return 'month';
  }
  return 'decade';
}
