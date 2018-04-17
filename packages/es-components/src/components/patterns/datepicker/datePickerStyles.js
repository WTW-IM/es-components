export default function datepickerStyles(colors, dpColors) {
  return `
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle,
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
      margin-left: -8px;
      position: absolute;
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle,
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before {
      box-sizing: content-box;
      position: absolute;
      border: 8px solid transparent;
      height: 0;
      width: 1px;
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before {
      content: "";
      z-index: -1;
      border-width: 8px;
      left: -8px;
      border-bottom-color: ${colors.gray5};
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      top: 0;
      margin-top: -8px;
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle,
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
      border-top: none;
      border-bottom-color: ${colors.gray1};
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
      top: -1px;
      border-bottom-color: ${colors.gray5};
  }
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
      bottom: 0;
      margin-bottom: -8px;
  }
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before {
      border-bottom: none;
      border-top-color: ${colors.white};
  }
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before {
      bottom: -1px;
      border-top-color: ${colors.gray5};
  }
  .react-datepicker-wrapper {
      display: inline-block;
  }
  .react-datepicker {
      font-size: 0.9rem;
      background-color: ${colors.white};
      color: ${colors.black};
      border: 1px solid ${colors.gray5};
      box-shadow: 0 5px 10px ${colors.boxShadowLight};
      display: inline-block;
      position: relative;
  }
  .react-datepicker__triangle {
      position: absolute;
      left: 50px;
  }
  .react-datepicker-popper {
      z-index: 1060;
  }
  .react-datepicker-popper[data-placement^="top"] {
      margin-bottom: 6px;
  }
  .react-datepicker-popper[data-placement^="right"] {
      margin-left: 8px;
  }
  .react-datepicker-popper[data-placement^="right"] .react-datepicker__triangle {
      left: auto;
      right: 42px;
  }
  .react-datepicker-popper[data-placement^="left"] {
      margin-right: 8px;
  }
  .react-datepicker-popper[data-placement^="left"] .react-datepicker__triangle {
      left: 42px;
      right: auto;
  }
  .react-datepicker__header {
      text-align: center;
      background-color: ${colors.gray1};
      border-bottom: 1px solid ${colors.gray5};
      padding-top: 10px;
      position: relative;
  }
  .react-datepicker__header--time {
      padding-bottom: 8px;
  }
  .react-datepicker__year-dropdown-container--select,
  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__year-dropdown-container--scroll,
  .react-datepicker__month-dropdown-container--scroll {
      display: inline-block;
      margin: 0 2px;
  }
  .react-datepicker__current-month,
  .react-datepicker-time__header {
      margin: 0 0 5px 0;
      color: ${colors.black};
      font-weight: bold;
      font-size: 1rem;
  }
  .react-datepicker__navigation {
      background-color: transparent;
      line-height: 1.7rem;
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 10px;
      width: 0;
      border: 0.45rem solid transparent;
      z-index: 1;
  }
  .react-datepicker__navigation--previous {
      left: 10px;
      border-right-color: ${dpColors.navArrow};
  }
  .react-datepicker__navigation--previous:hover {
      border-right-color: ${dpColors.navArrowHover};
  }
  .react-datepicker__navigation--next {
      right: 10px;
      border-left-color: ${dpColors.navArrow};
  }
  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
      right: 110px;
  }
  .react-datepicker__navigation--next:hover {
      border-left-color: ${dpColors.navArrowHover};
  }
  .react-datepicker__navigation--years {
      position: relative;
      top: 0;
      display: block;
      margin-left: auto;
      margin-right: auto;
  }
  .react-datepicker__navigation--years-previous {
      top: 4px;
      border-top-color: ${dpColors.navArrow};
  }
  .react-datepicker__navigation--years-previous:hover {
      border-top-color: ${dpColors.navArrowHover};
  }
  .react-datepicker__navigation--years-upcoming {
      top: -4px;
      border-bottom-color: ${dpColors.navArrow};
  }
  .react-datepicker__navigation--years-upcoming:hover {
      border-bottom-color: ${dpColors.navArrowHover};
  }
  .react-datepicker__month-container {
      float: left;
  }
  .react-datepicker__month {
      margin: 0.4rem;
      text-align: center;
  }
  .react-datepicker__time-container {
      float: right;
      border-left: 1px solid ${colors.gray5};
  }
  .react-datepicker__time-container--with-today-button {
      display: inline;
      border: 1px solid ${colors.gray5};
      position: absolute;
      right: -72px;
      top: 0;
  }
  .react-datepicker__time-container .react-datepicker__time {
      position: relative;
      background: white;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
      width: 102px;
      overflow-x: hidden;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
      list-style: none;
      margin: 0;
      height: 204px;
      overflow-y: scroll;
      padding: 0;
      width: 100%;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
      padding: 5px 10px;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
      cursor: pointer;
      background-color: ${colors.gray1};
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
      background-color: ${dpColors.selected};
      color: white;
      font-weight: bold;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected:hover {
      background-color: ${dpColors.selected};
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--disabled {
      color: ${colors.gray2};
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--disabled:hover {
      cursor: default;
      background-color: transparent;
  }
  .react-datepicker__week-number {
      color: ${colors.gray2};
      display: inline-block;
      width: 1.7rem;
      line-height: 1.7rem;
      text-align: center;
      margin: 0.166rem;
  }
  .react-datepicker__week-number.react-datepicker__week-number--clickable {
      cursor: pointer;
  }
  .react-datepicker__week-number.react-datepicker__week-number--clickable:hover {
      border-radius: 0.3rem;
      background-color: ${colors.gray1};
  }
  .react-datepicker__day-names,
  .react-datepicker__week {
      white-space: nowrap;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
      color: ${colors.black};
      display: inline-block;
      width: 1.9rem;
      line-height: 1.9rem;
      text-align: center;
      margin: 0.2rem;
  }
  .react-datepicker__day {
      cursor: pointer;
  }
  .react-datepicker__day:hover {
      border-radius: 0.3rem;
      background-color: ${colors.gray3};
  }
  .react-datepicker__day--today {
      font-weight: bold;
  }
  .react-datepicker__day--highlighted {
      border-radius: 0.3rem;
      background-color: ${dpColors.highlight};
      color: ${colors.white};
  }
  .react-datepicker__day--highlighted:hover {
      background-color: ${dpColors.highlightHover};
      color: ${colors.black}
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
      border-radius: 0.3rem;
      background-color: ${dpColors.selected};
      color: ${colors.white};
  }
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover {
      background-color: ${dpColors.hover};
  }
  .react-datepicker__day--keyboard-selected {
      border-radius: 0.3rem;
      background-color: ${dpColors.keyboard};
      color: ${colors.white};
  }
  .react-datepicker__day--keyboard-selected:hover {
      background-color: ${dpColors.hover};
  }
  .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range) {
      background-color: ${dpColors.inRange};
      color: ${colors.black};
  }
  .react-datepicker__month--selecting-range .react-datepicker__day--in-range:not(.react-datepicker__day--in-selecting-range) {
      background-color: ${colors.gray3};
      color: ${colors.black};
  }
  .react-datepicker__day--disabled {
      cursor: default;
      color: ${colors.gray5};
  }
  .react-datepicker__day--disabled:hover {
      background-color: transparent;
  }
  .react-datepicker__input-container {
      position: relative;
      display: inline-block;
  }
  .react-datepicker__year-read-view,
  .react-datepicker__month-read-view {
      border: 1px solid transparent;
  }
  .react-datepicker__year-read-view:hover,
  .react-datepicker__month-read-view:hover {
      cursor: pointer;
  }
  .react-datepicker__year-read-view:hover .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__year-read-view:hover .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-read-view:hover .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view:hover .react-datepicker__month-read-view--down-arrow {
      border-top-color: ${colors.gray5};
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
      border-top-color: ${colors.gray3};
      float: right;
      margin-left: 20px;
      top: 5px;
      position: relative;
      border-width: 0.45rem;
  }
  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown {
      background-color: ${colors.gray1};
      position: absolute;
      width: 50%;
      left: 25%;
      top: 30px;
      z-index: 1;
      text-align: center;
      border: 1px solid ${colors.gray5};
  }
  .react-datepicker__year-dropdown:hover,
  .react-datepicker__month-dropdown:hover {
      cursor: pointer;
  }
  .react-datepicker__year-dropdown--scrollable,
  .react-datepicker__month-dropdown--scrollable {
      height: 150px;
      overflow-y: scroll;
  }
  .react-datepicker__year-option,
  .react-datepicker__month-option {
      line-height: 20px;
      width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
  }
  .react-datepicker__year-option:first-of-type,
  .react-datepicker__month-option:first-of-type {
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
  }
  .react-datepicker__year-option:last-of-type,
  .react-datepicker__month-option:last-of-type {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border-bottom-left-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
  }
  .react-datepicker__year-option:hover,
  .react-datepicker__month-option:hover {
      background-color: ${colors.gray3};
  }
  .react-datepicker__year-option:hover .react-datepicker__navigation--years-upcoming,
  .react-datepicker__month-option:hover .react-datepicker__navigation--years-upcoming {
      border-bottom-color: ${colors.gray3};
  }
  .react-datepicker__year-option:hover .react-datepicker__navigation--years-previous,
  .react-datepicker__month-option:hover .react-datepicker__navigation--years-previous {
      border-top-color: ${colors.gray3};
  }
  .react-datepicker__year-option--selected,
  .react-datepicker__month-option--selected {
      position: absolute;
      left: 15px;
  }
  .react-datepicker__close-icon {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      display: inline-block;
      height: 0;
      outline: 0;
      padding: 0;
      vertical-align: middle;
  }
  .react-datepicker__close-icon::after {
      background-color: ${dpColors.selected};
      border-radius: 50%;
      bottom: 0;
      box-sizing: border-box;
      color: ${colors.white};
      content: "\00d7";
      cursor: pointer;
      font-size: 12px;
      height: 16px;
      width: 16px;
      line-height: 1;
      margin: -8px auto 0;
      padding: 2px;
      position: absolute;
      right: 7px;
      text-align: center;
      top: 50%;
  }
  .react-datepicker__today-button {
      background: ${colors.gray1};
      border-top: 1px solid ${colors.gray5};
      cursor: pointer;
      text-align: center;
      font-weight: bold;
      padding: 5px 0;
      clear: left;
  }
  .react-datepicker__portal {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background-color: ${colors.boxShadowDark};
      left: 0;
      top: 0;
      justify-content: center;
      align-items: center;
      display: flex;
      z-index: 2147483647;
  }
  .react-datepicker__portal .react-datepicker__day-name,
  .react-datepicker__portal .react-datepicker__day,
  .react-datepicker__portal .react-datepicker__time-name {
      width: 3rem;
      line-height: 3rem;
  }
  @media (max-width: 400px),
  (max-height: 550px) {
      .react-datepicker__portal .react-datepicker__day-name,
      .react-datepicker__portal .react-datepicker__day,
      .react-datepicker__portal .react-datepicker__time-name {
          width: 2rem;
          line-height: 2rem;
      }
  }
  .react-datepicker__portal .react-datepicker__current-month,
  .react-datepicker__portal .react-datepicker-time__header {
      font-size: 1.44rem;
  }
  .react-datepicker__portal .react-datepicker__navigation {
      border: 0.81rem solid transparent;
  }
  .react-datepicker__portal .react-datepicker__navigation--previous {
      border-right-color: ${dpColors.navArrow};
  }
  .react-datepicker__portal .react-datepicker__navigation--previous:hover {
      border-right-color: ${dpColors.navArrowHover};
  }
  .react-datepicker__portal .react-datepicker__navigation--next {
      border-left-color: ${dpColors.navArrow};
  }
  .react-datepicker__portal .react-datepicker__navigation--next:hover {
      border-left-color: ${dpColors.navArrowHover};
  }
`;
}
