import getYear from 'date-fns/get_year';
import setYear from 'date-fns/set_year';
import getMonth from 'date-fns/get_month';
import setMonth from 'date-fns/set_month';
import getDay from 'date-fns/get_day';
import setDate from 'date-fns/set_date';
import startOfMonth from 'date-fns/start_of_month';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import { indexOf } from 'lodash';

import { getYearChunkIndex } from './picker-fns';
import * as dateConstants from './date-constants';

function setToPreviousYearChunk(previousState) {
  return { currentYearChunkIndex: previousState.currentYearChunkIndex - 1 };
}

function setToNextYearChunk(previousState) {
  return { currentYearChunkIndex: previousState.currentYearChunkIndex + 1 };
}

function updateYear(date, yearUpdater) {
  const year = getYear(date);
  const newYear = yearUpdater(year);
  return setYear(date, newYear);
}

function setToPreviousYear(previousState) {
  const currentlySelectedDate = updateYear(previousState.currentlySelectedDate, year => year - 1);
  return { currentlySelectedDate, dateSelectionComplete: false };
}

function setToNextYear(previousState) {
  const currentlySelectedDate = updateYear(previousState.currentlySelectedDate, year => year + 1);
  return { currentlySelectedDate, dateSelectionComplete: false };
}

function yearSelected(previousState, year) {
  const currentlySelectedDate = setYear(previousState.currentlySelectedDate, year);
  const currentlyDisplayedMonth = new Date(getYear(currentlySelectedDate), getMonth(currentlySelectedDate));
  return {
    currentlySelectedDate,
    selectedYear: year,
    selectionMode: 'month',
    dateSelectionComplete: false,
    currentlyDisplayedMonth
  };
}

function setToYearSelection(previousState) {
  const currentYear = getYear(previousState.currentlySelectedDate);
  const { yearChunks } = previousState;
  const currentYearChunkIndex = getYearChunkIndex(yearChunks, currentYear);

  return { currentYearChunkIndex, selectionMode: 'year', dateSelectionComplete: false };
}

function setToPreviousMonth(previousState) {
  const { currentlySelectedDate: date } = previousState;
  const currentlySelectedMonth = getMonth(date);
  let updatedDate;

  if (currentlySelectedMonth === dateConstants.JANUARY) {
    updatedDate = setMonth(updateYear(date, year => year - 1), dateConstants.DECEMBER);
  } else {
    updatedDate = setMonth(date, currentlySelectedMonth - 1);
  }

  const monthStartDay = getDay(startOfMonth(updatedDate));
  const monthEndDay = getDay(lastDayOfMonth(updatedDate));

  const currentlyDisplayedMonth = new Date(getYear(updatedDate), getMonth(updatedDate));

  return {
    currentlySelectedDate: updatedDate,
    dateSelectionComplete: false,
    monthStartDay,
    monthEndDay,
    currentlyDisplayedMonth
  };
}

function setToNextMonth(previousState) {
  const { currentlySelectedDate: date } = previousState;
  const currentMonth = getMonth(date);

  let updatedDate;

  if (currentMonth === dateConstants.DECEMBER) {
    updatedDate = setMonth(updateYear(date, year => year + 1), dateConstants.JANUARY);
  } else {
    updatedDate = setMonth(date, currentMonth + 1);
  }

  const monthStartDay = getDay(startOfMonth(updatedDate));
  const monthEndDay = getDay(lastDayOfMonth(updatedDate));

  const currentlyDisplayedMonth = new Date(getYear(updatedDate), getMonth(updatedDate));

  return {
    currentlySelectedDate: updatedDate,
    dateSelectionComplete: false,
    monthStartDay,
    monthEndDay,
    currentlyDisplayedMonth
  };
}

function monthSelected(previousState, month) {
  const selectedMonthIndex = indexOf(dateConstants.MONTHS, month);
  const dateWithMonthSelected = setMonth(previousState.currentlySelectedDate, selectedMonthIndex);
  const currentlySelectedDate = previousState.dateWasPreselected ?
    dateWithMonthSelected :
    startOfMonth(dateWithMonthSelected);
  const monthStartDay = getDay(currentlySelectedDate);
  const monthEndDay = getDay(lastDayOfMonth(currentlySelectedDate));

  const currentlyDisplayedMonth = new Date(getYear(currentlySelectedDate), getMonth(currentlySelectedDate));

  return {
    selectionMode: 'day',
    currentlySelectedDate,
    monthStartDay,
    monthEndDay,
    dateSelectionComplete: false,
    selectedMonth: month,
    selectedMonthIndex,
    currentlyDisplayedMonth
  };
}

function daySelected(previousState, day) {
  const currentlySelectedDate = setDate(previousState.currentlySelectedDate, day);
  const selectedMonthIndex = getMonth(currentlySelectedDate);
  return {
    currentlySelectedDate,
    dateSelectionComplete: true,
    selectedDay: day,
    selectedMonthIndex
  };
}

const pickerStateTransitions = {
  setToPreviousYearChunk,
  setToNextYearChunk,
  setToPreviousYear,
  setToNextYear,
  yearSelected,
  setToYearSelection,
  setToPreviousMonth,
  setToNextMonth,
  monthSelected,
  daySelected
};

export default pickerStateTransitions;
