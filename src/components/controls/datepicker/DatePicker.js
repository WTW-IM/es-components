import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';
import getDay from 'date-fns/get_day';
import getDate from 'date-fns/get_date';
import startOfMonth from 'date-fns/start_of_month';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import format from 'date-fns/format';
import subMonths from 'date-fns/sub_months';
import isEqual from 'date-fns/is_equal';
import {
  chunk,
  first,
  last,
  range,
  rangeRight,
  noop
} from 'lodash';

import { isPropValidDate } from '../../util/prop-validators';
import * as picker from './picker-fns';
import pickerStateTransitions from './picker-state-transitions';
import * as dateConstants from './date-constants';

import PickerHeader from './PickerHeader';
import PickerGrid from './PickerGrid';
import PickerButton from './PickerButton';

const Picker = styled.div`
  padding: 5px 10px 10px 10px;
  width: 300px;
`;

export default class DatePicker extends React.Component {
  static propTypes = {
    /** Function to run once a full date has been selected */
    dateSelected: PropTypes.func.isRequired,
    /** Year to start datepicker */
    startingYear: PropTypes.number,
    /** Number of years or months to go back */
    descentAmount: PropTypes.number,
    startingSelectionMode: PropTypes.oneOf(['year', 'month']),
    /** The currently selected date */
    preselectedDate: isPropValidDate
  }

  static defaultProps = {
    startingSelectionMode: 'year'
  }

  constructor(props) {
    super(props);

    const { startingYear, startingSelectionMode, preselectedDate } = props;
    const descentAmount = props.descentAmount || picker.getDefaultDescentAmountForSelectionMode(startingSelectionMode);

    const todaysDate = new Date();
    const { currentlySelectedDate, selectedDateParts, dateWasPreselected } = picker.determineInitialStateOfDates(preselectedDate, startingYear, todaysDate);

    const thisYear = getYear(todaysDate);
    let currentYear = thisYear;
    if (dateWasPreselected) {
      currentYear = getYear(currentlySelectedDate);
    }

    const years = picker.getYearsForSelectionMode(startingSelectionMode, startingYear || thisYear, descentAmount);
    const yearChunks = chunk(years, 12);
    const determinedSelectionMode = picker.getStartingSelectionMode(startingSelectionMode, descentAmount);
    const totalSelectableMonths = picker.getTotalSelectableMonths(determinedSelectionMode, todaysDate, descentAmount, years.length);
    const earliestPossibleDate = startingYear !== undefined ?
      subMonths(new Date(startingYear, getMonth(todaysDate), getDay(todaysDate)), totalSelectableMonths) :
      subMonths(todaysDate, totalSelectableMonths);
    const latestPossibleDate = startingYear !== undefined ?
      new Date(startingYear, getMonth(todaysDate), getDate(todaysDate)) :
      todaysDate;

    this.state = {
      descentAmount,
      earliestPossibleDate,
      latestPossibleDate,
      selectionMode: determinedSelectionMode,
      dateSelectionComplete: false,
      suppressYearSelection: determinedSelectionMode === 'month',
      suppressMonthSelection: determinedSelectionMode === 'day',
      currentlySelectedDate,
      currentlyDisplayedMonth: latestPossibleDate,
      yearChunks,
      currentYearChunkIndex: picker.getYearChunkIndex(yearChunks, startingYear || currentYear),
      monthsToDisplayByYear: picker.splitMonthsByYears(years.reverse(), totalSelectableMonths, todaysDate),
      dateWasPreselected,
      ...selectedDateParts
    };

    this.yearSelected = this.yearSelected.bind(this);
    this.monthSelected = this.monthSelected.bind(this);
    this.daySelected = this.daySelected.bind(this);

    this.setToPreviousYearChunk = this.setToPreviousYearChunk.bind(this);
    this.setToNextYearChunk = this.setToNextYearChunk.bind(this);

    this.setToPreviousYear = this.setToPreviousYear.bind(this);
    this.setToNextYear = this.setToNextYear.bind(this);

    this.setToPreviousMonth = this.setToPreviousMonth.bind(this);
    this.setToNextMonth = this.setToNextMonth.bind(this);

    this.setHeaderToYearChunkView = this.setHeaderToYearChunkView.bind(this);
    this.setHeaderToMonthView = this.setHeaderToMonthView.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.dateSelectionComplete) {
      return !isEqual(this.state.currentlySelectedDate, nextState.currentlySelectedDate);
    }
    return true;
  }

  componentDidUpdate() {
    const { currentlySelectedDate, dateSelectionComplete } = this.state;
    if (dateSelectionComplete) {
      this.props.dateSelected(currentlySelectedDate);
    }
  }

  setToPreviousYearChunk() {
    this.setState(pickerStateTransitions.setToPreviousYearChunk);
  }

  setToNextYearChunk() {
    this.setState(pickerStateTransitions.setToNextYearChunk);
  }

  setToPreviousYear() {
    this.setState(pickerStateTransitions.setToPreviousYear);
  }

  setToNextYear() {
    this.setState(pickerStateTransitions.setToNextYear);
  }

  setToPreviousMonth() {
    this.setState(pickerStateTransitions.setToPreviousMonth);
  }

  setToNextMonth() {
    this.setState(pickerStateTransitions.setToNextMonth);
  }

  setHeaderToYearChunkView() {
    this.setState(pickerStateTransitions.setToYearSelection);
  }

  setHeaderToMonthView() {
    this.setState({ selectionMode: 'month' });
  }

  getPickerGridValues() {
    const {
      currentlySelectedDate,
      yearChunks,
      currentYearChunkIndex,
      selectionMode
    } = this.state;

    const currentYearChunk = yearChunks[currentYearChunkIndex];
    const firstYearInChunk = first(currentYearChunk);
    const lastYearInChunk = last(currentYearChunk);

    if (selectionMode === 'month') {
      const { suppressYearSelection, monthsToDisplayByYear } = this.state;
      const year = getYear(currentlySelectedDate);

      const isNotFirstYearChunk = !picker.isFirstYearChunk(currentYearChunkIndex);
      const isNotLastYearChunk = !picker.isLastYearChunk(yearChunks, currentYearChunkIndex);
      const isNotFirstYearInChunk = !picker.isFirstYearInChunk(currentYearChunk, year);
      const isNotFirstYearOfFirstChunk = picker.isFirstYearChunk(currentYearChunkIndex) &&
              isNotFirstYearInChunk;
      const isNotLastYearInChunk = !picker.isLastYearInChunk(currentYearChunk, year);
      const isNotLastYearOfLastChunk = picker.isLastYearChunk(yearChunks, currentYearChunkIndex) &&
              isNotLastYearInChunk;

      const monthsToDisplay = monthsToDisplayByYear[year];
      let includedMonths = range(0, monthsToDisplay).map(x => dateConstants.MONTHS[x]);

      let prependedContent = null;
      let appendedContent = null;

      const getDisabledPickerButton = (monthIndex) => <PickerButton key={monthIndex} displayed disabled>{dateConstants.MONTHS[monthIndex]}</PickerButton>;

      if (picker.isLastYearInChunk(currentYearChunk, year)) {
        appendedContent = range(monthsToDisplay + 1, dateConstants.DECEMBER + 1).map(getDisabledPickerButton);
        includedMonths = range(0, monthsToDisplay + 1).map(x => dateConstants.MONTHS[x]);
      }
      if (picker.isFirstYearInChunk(currentYearChunk, year)) {
        const rangeFactor = 11 - monthsToDisplay;
        prependedContent = range(dateConstants.JANUARY, rangeFactor + 1).map(getDisabledPickerButton);
        includedMonths = rangeRight(dateConstants.DECEMBER, rangeFactor)
          .map(x => dateConstants.MONTHS[x]);
      }

      return {
        pickerGridValues: {
          set: {
            prependedContent,
            included: includedMonths,
            appendedContent
          },
          pickerElementSelected: this.monthSelected,
          selectedItem: this.state.selectedMonth
        },
        pickerHeaderValues: {
          pickerHeaderText: year,
          shouldRenderPreviousButton: isNotFirstYearChunk || isNotFirstYearOfFirstChunk,
          previousAction: this.setToPreviousYear,
          currentSelectionAction: suppressYearSelection ? noop : this.setHeaderToYearChunkView,
          shouldRenderNextButton: isNotLastYearChunk || isNotLastYearOfLastChunk,
          nextAction: this.setToNextYear
        }
      };
    }

    if (selectionMode === 'day') {
      const {
        suppressMonthSelection,
        dateWasPreselected,
        earliestPossibleDate,
        currentlyDisplayedMonth,
        latestPossibleDate,
        monthStartDay,
        monthEndDay,
        dateSelectionComplete
      } = this.state;
      const year = getYear(currentlySelectedDate);
      const month = getMonth(currentlySelectedDate);
      const date = getDate(currentlySelectedDate);
      const isCurrentMonthOfCurrentYear = month === getMonth(latestPossibleDate) &&
        year === getYear(latestPossibleDate);

      const set = picker.getGridSetValuesForDaySelection(currentlySelectedDate,
                                                         latestPossibleDate,
                                                         monthStartDay || getDay(startOfMonth(currentlySelectedDate)),
                                                         monthEndDay || getDay(lastDayOfMonth(currentlySelectedDate)),
                                                         isCurrentMonthOfCurrentYear);

      const displayedYear = getYear(currentlyDisplayedMonth);
      const earliestPossibleYear = getYear(earliestPossibleDate);
      const latestPossibleYear = getYear(latestPossibleDate);

      const displayedMonth = getMonth(currentlyDisplayedMonth);
      const earliestPossibleMonth = getMonth(earliestPossibleDate);
      const latestPossibleMonth = getMonth(latestPossibleDate);

      const isNotEarliestPossibleYear = displayedYear !== earliestPossibleYear;
      const isNotEarliestPossibleMonth = displayedYear === earliestPossibleYear &&
        displayedMonth > earliestPossibleMonth;

      const isNotLatestPossibleYear = displayedYear !== latestPossibleYear;
      const isNotLatestPossibleMonth = displayedYear === latestPossibleYear &&
        displayedMonth < latestPossibleMonth;

      const displaySelectedItem = dateSelectionComplete || dateWasPreselected;

      return {
        pickerGridValues: {
          set,
          pickerElementSelected: this.daySelected,
          selectedItem: displaySelectedItem ? date : null,
          columnAmount: 7
        },
        pickerHeaderValues: {
          pickerHeaderText: format(currentlySelectedDate, 'MMMM YYYY'),
          shouldRenderPreviousButton: isNotEarliestPossibleMonth || isNotEarliestPossibleYear,
          previousAction: this.setToPreviousMonth,
          currentSelectionAction: suppressMonthSelection ? noop : this.setHeaderToMonthView,
          shouldRenderNextButton: isNotLatestPossibleMonth || isNotLatestPossibleYear,
          nextAction: this.setToNextMonth
        }
      };
    }

    return {
      pickerGridValues: {
        set: { included: currentYearChunk },
        pickerElementSelected: this.yearSelected,
        selectedItem: this.state.selectedYear
      },
      pickerHeaderValues: {
        pickerHeaderText: `${firstYearInChunk}-${lastYearInChunk}`,
        shouldRenderPreviousButton: currentYearChunkIndex !== 0,
        previousAction: this.setToPreviousYearChunk,
        currentSelectionAction: noop,
        shouldRenderNextButton: currentYearChunkIndex !== yearChunks.length - 1,
        nextAction: this.setToNextYearChunk,
        suppressCurrentAction: true
      }
    };
  }

  yearSelected(year) {
    this.setState(previousState => pickerStateTransitions.yearSelected(previousState, year));
  }

  monthSelected(month) {
    this.setState(previousState => pickerStateTransitions.monthSelected(previousState, month));
  }

  daySelected(day) {
    this.setState(previousState => pickerStateTransitions.daySelected(previousState, day));
  }

  render() {
    const pickerValues = this.getPickerGridValues();
    const { pickerHeaderValues, pickerGridValues } = pickerValues;
    const { selectionMode } = this.state;
    const previousSelectionMode = picker.getPreviousSelectionMode(selectionMode);

    return (
      <Picker>
        <PickerHeader
          {...pickerHeaderValues}
          currentMode={selectionMode}
          previousMode={previousSelectionMode}
        />
        {pickerValues.pickerGridValues.subHeader}
        <PickerGrid
          {...pickerGridValues}
        />
      </Picker>
    );
  }
}
