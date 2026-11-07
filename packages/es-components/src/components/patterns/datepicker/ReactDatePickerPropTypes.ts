import PropTypes from 'prop-types';
import type { DatePickerProps } from 'react-datepicker';
import { Placement, placements } from '@floating-ui/utils';
import type { Middleware } from '@floating-ui/dom';

export interface HighlightDates {
  [className: string]: Date[];
}

export type PopperPlacement = Placement;

export type OurReactDatePickerProps = Override<
  DatePickerProps,
  {
    highlightDates?: (HighlightDates | Date)[] | undefined;
  }
>;

export type ReactDatePickerPropTypes = {
  [key in keyof OurReactDatePickerProps]:
    | PropTypes.Requireable<OurReactDatePickerProps[key]>
    | PropTypes.Validator<OurReactDatePickerProps[key]>;
};

type DateInterval = {
  start: Date;
  end: Date;
};

export type InnerHighlightDates = DatePickerProps['highlightDates'];

// copied from react-datepicker@v4.15.0 - https://github.com/Hacker0x01/react-datepicker/blob/v4.15.0/src/index.jsx
// Note: react-datepicker v9's DatePickerProps is a discriminated union (several
// mutually-exclusive prop shapes for range/multi-select/month-year-dropdown
// variants, etc). A single flat PropTypes validator map can't satisfy every
// branch's narrowed literal types at once, so the object is intentionally
// cast through `unknown` rather than fighting the union per-field.
const rawReactDatePickerPropTypes = {
  adjustDateOnChange: PropTypes.bool,
  allowSameDay: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
  ariaInvalid: PropTypes.string,
  ariaLabelClose: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  ariaRequired: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  calendarClassName: PropTypes.string,
  calendarContainer: PropTypes.func,
  children: PropTypes.node,
  chooseDayAriaLabelPrefix: PropTypes.string,
  closeOnScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  className: PropTypes.string,
  customInput: PropTypes.element,
  customInputRef: PropTypes.string,
  calendarStartDay: PropTypes.number,

  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  dateFormatCalendar: PropTypes.string,
  dayClassName: PropTypes.func,
  weekDayClassName: PropTypes.func,
  disabledDayAriaLabelPrefix: PropTypes.string,
  monthClassName: PropTypes.func,
  timeClassName: PropTypes.func,
  disabled: PropTypes.bool,
  disabledKeyboardNavigation: PropTypes.bool,
  dropdownMode: PropTypes.oneOf(['scroll', 'select'] as const),
  endDate: PropTypes.instanceOf(Date),
  excludeDates: PropTypes.array,
  excludeDateIntervals: PropTypes.arrayOf<DateInterval>(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired
    }).isRequired
  ),
  filterDate: PropTypes.func,
  fixedHeight: PropTypes.bool,
  form: PropTypes.string,
  formatWeekNumber: PropTypes.func,
  highlightDates: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(Date).isRequired,
      PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired).isRequired
      ).isRequired
    ]).isRequired
  ),
  id: PropTypes.string,
  includeDates: PropTypes.array,
  includeDateIntervals: PropTypes.array,
  includeTimes: PropTypes.array,
  injectTimes: PropTypes.array,
  inline: PropTypes.bool,
  isClearable: PropTypes.bool,
  showIcon: PropTypes.bool,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  monthsShown: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onWeekSelect: PropTypes.func,
  onClickOutside: PropTypes.func,
  onChangeRaw: PropTypes.func,
  onFocus: PropTypes.func,
  onInputClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onInputError: PropTypes.func,
  open: PropTypes.bool,
  onCalendarOpen: PropTypes.func,
  onCalendarClose: PropTypes.func,
  openToDate: PropTypes.instanceOf(Date),
  peekNextMonth: PropTypes.bool,
  placeholderText: PropTypes.string,
  popperContainer: PropTypes.func,
  popperClassName: PropTypes.string, // <PopperComponent/> props
  popperModifiers: PropTypes.arrayOf<Middleware>(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      options: PropTypes.object,
      fn: PropTypes.func.isRequired
    }).isRequired
  ), // <PopperComponent/> props
  popperPlacement: PropTypes.oneOf<Placement>(placements), // <PopperComponent/> props
  popperProps: PropTypes.object,
  preventOpenOnFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  scrollableYearDropdown: PropTypes.bool,
  scrollableMonthYearDropdown: PropTypes.bool,
  selected: PropTypes.instanceOf(Date),
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  selectsRange: PropTypes.oneOfType([
    PropTypes.oneOf<boolean | undefined>([undefined, true, false]).isRequired
  ]),
  selectsDisabledDaysInRange: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  showPreviousMonths: PropTypes.bool,
  showMonthYearDropdown: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  strictParsing: PropTypes.bool,
  forceShowMonthNavigation: PropTypes.bool,
  showDisabledMonthNavigation: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  startOpen: PropTypes.bool,
  tabIndex: PropTypes.number,
  timeCaption: PropTypes.string,
  title: PropTypes.string,
  todayButton: PropTypes.node,
  useWeekdaysShort: PropTypes.bool,
  formatWeekDay: PropTypes.func,
  value: PropTypes.string,
  weekLabel: PropTypes.string,
  withPortal: PropTypes.bool,
  portalId: PropTypes.string,
  portalHost: PropTypes.instanceOf(ShadowRoot),
  yearItemNumber: PropTypes.number,
  yearDropdownItemNumber: PropTypes.number,
  shouldCloseOnSelect: PropTypes.bool,
  showTimeInput: PropTypes.bool,
  showMonthYearPicker: PropTypes.bool,
  showFullMonthYearPicker: PropTypes.bool,
  showTwoColumnMonthYearPicker: PropTypes.bool,
  showFourColumnMonthYearPicker: PropTypes.bool,
  showYearPicker: PropTypes.bool,
  showQuarterYearPicker: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  minTime: PropTypes.instanceOf(Date),
  maxTime: PropTypes.instanceOf(Date),
  excludeTimes: PropTypes.array,
  filterTime: PropTypes.func,
  useShortMonthInDropdown: PropTypes.bool,
  clearButtonTitle: PropTypes.string,
  clearButtonClassName: PropTypes.string,
  previousMonthAriaLabel: PropTypes.string,
  previousMonthButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  nextMonthAriaLabel: PropTypes.string,
  nextMonthButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  previousYearAriaLabel: PropTypes.string,
  previousYearButtonLabel: PropTypes.string,
  nextYearAriaLabel: PropTypes.string,
  nextYearButtonLabel: PropTypes.string,
  timeInputLabel: PropTypes.string,
  renderCustomHeader: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderMonthContent: PropTypes.func,
  renderQuarterContent: PropTypes.func,
  renderYearContent: PropTypes.func,
  wrapperClassName: PropTypes.string,
  focusSelectedMonth: PropTypes.bool,
  onDayMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  onYearMouseEnter: PropTypes.func,
  onYearMouseLeave: PropTypes.func,
  showPopperArrow: PropTypes.bool,
  excludeScrollbar: PropTypes.bool,
  enableTabLoop: PropTypes.bool,
  customTimeInput: PropTypes.element,
  weekAriaLabelPrefix: PropTypes.string,
  monthAriaLabelPrefix: PropTypes.string
};

export const reactDatePickerPropTypes =
  rawReactDatePickerPropTypes as unknown as ReactDatePickerPropTypes;

export type ReactDatePickerPropName = Extract<
  keyof OurReactDatePickerProps,
  string
>;

export const reactDatepickerPropKeys: ReactDatePickerPropName[] = Object.keys(
  reactDatePickerPropTypes
).map(key => key as ReactDatePickerPropName);

export default reactDatePickerPropTypes;
