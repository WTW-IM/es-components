import {
  DefaultTheme,
  FlattenInterpolation,
  ThemedStyledProps,
  createGlobalStyle,
  css
} from 'styled-components';

type CSSReturn = FlattenInterpolation<ThemedStyledProps<unknown, DefaultTheme>>;

const ariaStyles = css`
  .react-datepicker__aria-live {
    border: 0;
    clip-path: circle(0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

const downArrowStyles = css`
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    margin-left: -8px;
    position: absolute;
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before,
  .react-datepicker__month-year-read-view--down-arrow::before {
    box-sizing: content-box;
    position: absolute;
    border: 8px solid transparent;
    height: 0;
    width: 1px;
  }

  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before,
  .react-datepicker__month-year-read-view--down-arrow::before {
    content: '';
    z-index: -1;
    border-width: 8px;
    left: -8px;
    border-bottom-color: ${({ theme }) => theme.colors.gray5};
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    bottom: 1px;
    margin-bottom: -8px;
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before,
  .react-datepicker__month-year-read-view--down-arrow::before {
    border-bottom: none;
    border-top-color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before,
  .react-datepicker__month-year-read-view--down-arrow::before {
    bottom: -1px;
    border-top-color: ${({ theme }) => theme.colors.gray5};
  }
  .react-datepicker__year-read-view:hover
    .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__year-read-view:hover
    .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-read-view:hover
    .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view:hover
    .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view:hover
    .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-year-read-view:hover
    .react-datepicker__month-read-view--down-arrow {
    border-top-color: ${({ theme }) => theme.colors.gray5};
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    border-top-color: ${({ theme }) => theme.colors.gray3};
    float: right;
    margin-left: 20px;
    top: 5px;
    position: relative;
    border-width: 0.45rem;
  }
`;

const timeStyles = css`
  .react-datepicker--time-only {
    .react-datepicker__time-container {
      border-left: 0;
    }
    .react-datepicker__time,
    .react-datepicker__time-box {
      border-bottom-left-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
    }
  }
  .react-datepicker--time-only {
    .react-datepicker__time-container {
      border-left: 0;
    }
    .react-datepicker__time,
    .react-datepicker__time-box {
      border-bottom-left-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
    }
  }

  .react-datepicker--time-only .react-datepicker__time,
  .react-datepicker--time-only .react-datepicker__time-box {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .react-datepicker__time-container {
    float: right;
    border-left: 1px solid ${({ theme }) => theme.colors.gray5};

    &--with-today-button {
      display: inline;
      border: 1px solid ${({ theme }) => theme.colors.gray5};
      border-radius: 0.3rem;
      position: absolute;
      right: -72px;
      top: 0;
    }

    .react-datepicker__time {
      font-size: 14px;
      position: relative;
      background: white;
      border-bottom-right-radius: 0.3rem;
      .react-datepicker__time-box {
        width: 102px;
        overflow-x: hidden;
        margin: 0 auto;
        border-bottom-right-radius: 0.3rem;

        ul.react-datepicker__time-list {
          list-style: none;
          margin: 0;
          height: 204px;
          overflow-y: scroll;
          padding-right: 0;
          padding-left: 0;
          width: 100%;
          box-sizing: content-box;

          li.react-datepicker__time-list-item {
            padding: 5px 10px;
            white-space: nowrap;

            &:hover {
              cursor: pointer;
              background-color: ${({ theme }) => theme.colors.gray1};
            }

            &--selected {
              background-color: ${({ theme }) =>
                theme.datepickerColors.selected};
              color: white;
              font-weight: bold;

              &:hover {
                background-color: ${({ theme }) =>
                  theme.datepickerColors.selected};
              }
            }

            &--disabled {
              color: ${({ theme }) => theme.colors.gray2};

              &:hover {
                cursor: default;
                background-color: transparent;
              }
            }
          }
        }
      }
    }
  }

  .react-datepicker__input-time-container {
    &,
    & .react-datecker-time__input-container {
      &,
      & .react-datepicker-time__input {
        display: inline-block;
      }
    }

    .react-datepicker-time__input-container {
      clear: both;
      width: 100%;
      float: left;
      margin: 5px 0 10px 15px;
      text-align: left;

      .react-datepicker-time__input {
        margin-left: 10px;

        input {
          width: 85px;
        }

        input[type='time']::-webkit-inner-spin-button,
        input[type='time']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='time'] {
          -moz-appearance: textfield;
        }
      }

      .react-datepicker-time__delimiter {
        margin-left: 5px;
        display: inline-block;
      }
    }
  }

  .react-datepicker__portal .react-datepicker__current-month,
  .react-datepicker__portal .react-datepicker-time__header {
    font-size: 1.44rem;
  }
`;

const popperStyles = css<{ topIndex?: number }>`
  ${({ topIndex }) => css`
    .react-datepicker-popper {
      z-index: ${topIndex || 1060};
    }

    .react-datepicker-popper[data-placement^='bottom'] {
      margin-top: 12px;
    }

    .react-datepicker-popper[data-placement^='top'] {
      margin-bottom: 6px;
    }

    .react-datepicker-popper[data-placement^='right'] {
      margin-left: 8px;
    }

    .react-datepicker-popper[data-placement^='left'] {
      margin-right: 8px;
    }
  `}
`;

const headerStyles = css`
  .react-datepicker__header {
    text-align: center;
    background-color: ${({ theme }) => theme.datepickerColors.dpBackground};
    border-top-left-radius: 0.3rem;
    padding-top: 10px;
    position: relative;
  }

  .react-datepicker__header--time {
    padding-bottom: 8px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .react-datepicker__header--time:not(.react-datepicker__header--time--only) {
    border-top-left-radius: 0;
  }

  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: 0.3rem;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    font-size: 18px;
  }

  .react-datepicker-time__header {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const dropdownStyles = css`
  .react-datepicker__year-dropdown-container--select,
  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__month-year-dropdown-container--select,
  .react-datepicker__year-dropdown-container--scroll,
  .react-datepicker__month-dropdown-container--scroll,
  .react-datepicker__month-year-dropdown-container--scroll {
    display: inline-block;
    margin: 0 2px;
  }
`;

const navigationStyles = css`
  ${({ theme: { colors, datepickerColors } }) => css`
    .react-datepicker__navigation {
      background-color: transparent;
      line-height: 1.7rem;
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 10px;
      padding: 0;
      border: 0.45rem solid transparent;
      z-index: 1;
      height: 10px;
      width: 0;
      text-indent: -999em;
      overflow: hidden;
    }

    .react-datepicker__navigation--previous {
      left: 10px;
      border-right-color: ${datepickerColors.navArrow};
    }

    .react-datepicker__navigation--previous:hover {
      border-right-color: ${datepickerColors.navArrowHover};
    }

    .react-datepicker__navigation--previous--disabled,
    .react-datepicker__navigation--previous--disabled:hover {
      border-right-color: ${colors.gray3};
      cursor: default;
    }

    .react-datepicker__navigation--next {
      right: 10px;
      border-left-color: ${datepickerColors.navArrow};
    }

    .react-datepicker__navigation--next--with-time:not(
        .react-datepicker__navigation--next--with-today-button
      ) {
      right: 110px;
    }

    .react-datepicker__navigation--next:hover {
      border-left-color: ${datepickerColors.navArrowHover};
    }

    .react-datepicker__navigation--next--disabled,
    .react-datepicker__navigation--next--disabled:hover {
      border-left-color: ${colors.gray3};
      cursor: default;
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
      border-top-color: ${datepickerColors.dpBackground};
    }

    .react-datepicker__navigation--years-previous:hover {
      border-top-color: ${datepickerColors.dpBackground};
    }

    .react-datepicker__navigation--years-upcoming {
      top: -4px;
      border-bottom-color: ${datepickerColors.dpBackground};
    }

    .react-datepicker__navigation--years-upcoming:hover {
      border-bottom-color: ${datepickerColors.dpBackground};
    }

    .react-datepicker__portal .react-datepicker__navigation {
      border: 0.81rem solid transparent;
    }

    .react-datepicker__portal .react-datepicker__navigation--previous {
      border-right-color: ${datepickerColors.navArrow};
    }

    .react-datepicker__portal .react-datepicker__navigation--previous:hover {
      border-right-color: ${datepickerColors.navArrowHover};
    }

    .react-datepicker__portal .react-datepicker__navigation--previous--disabled,
    .react-datepicker__portal
      .react-datepicker__navigation--previous--disabled:hover {
      border-right-color: ${colors.gray3};
      cursor: default;
    }

    .react-datepicker__portal .react-datepicker__navigation--next {
      border-left-color: ${datepickerColors.navArrow};
    }

    .react-datepicker__portal .react-datepicker__navigation--next:hover {
      border-left-color: ${datepickerColors.navArrowHover};
    }

    .react-datepicker__portal .react-datepicker__navigation--next--disabled,
    .react-datepicker__portal
      .react-datepicker__navigation--next--disabled:hover {
      border-left-color: ${colors.gray3};
      cursor: default;
    }
  `}
`;

const dayStyles = css`
  .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }
  .react-datepicker__day-names {
    font-weight: bold;
  }
  .react-datepicker__day-names .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.white};
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: ${({ theme }) => theme.colors.gray9};
    display: inline-block;
    width: 1.9rem;
    line-height: 1.9rem;
    text-align: center;
    margin: 0.2rem;
  }

  .react-datepicker__portal .react-datepicker__day-name,
  .react-datepicker__portal .react-datepicker__day,
  .react-datepicker__portal .react-datepicker__time-name {
    width: 3rem;
    line-height: 3rem;
  }

  @media (max-width: 400px), (max-height: 550px) {
    .react-datepicker__portal .react-datepicker__day-name,
    .react-datepicker__portal .react-datepicker__day,
    .react-datepicker__portal .react-datepicker__time-name {
      width: 2rem;
      line-height: 2rem;
    }
  }
`;

const monthStyles = css`
  .react-datepicker__month-container {
    float: left;
  }

  .react-datepicker__month {
    margin: 0.4rem;
    text-align: center;
  }

  .react-datepicker__month .react-datepicker__month-text,
  .react-datepicker__month .react-datepicker__quarter-text {
    display: inline-block;
    width: 4rem;
    margin: 2px;
  }

  .react-datepicker__month--selected,
  .react-datepicker__month--in-selecting-range,
  .react-datepicker__month--in-range,
  .react-datepicker__quarter--selected,
  .react-datepicker__quarter--in-selecting-range,
  .react-datepicker__quarter--in-range {
    border-radius: 0.3rem;
    background-color: #216ba5;
    color: #fff;
  }

  .react-datepicker__month--selected:hover,
  .react-datepicker__month--in-selecting-range:hover,
  .react-datepicker__month--in-range:hover,
  .react-datepicker__quarter--selected:hover,
  .react-datepicker__quarter--in-selecting-range:hover,
  .react-datepicker__quarter--in-range:hover {
    background-color: #1d5d90;
  }

  .react-datepicker__month--disabled,
  .react-datepicker__quarter--disabled {
    color: #ccc;
    pointer-events: none;
  }

  .react-datepicker__month--disabled:hover,
  .react-datepicker__quarter--disabled:hover {
    cursor: default;
    background-color: transparent;
  }

  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text,
  .react-datepicker__year-text {
    cursor: pointer;
  }
`;

const yearStyles = css`
  .react-datepicker__year {
    margin: 0.4rem;
    text-align: center;
  }

  .react-datepicker__year-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 180px;
  }

  .react-datepicker__year .react-datepicker__year-text {
    display: inline-block;
    width: 4rem;
    margin: 2px;
  }
`;

const weekStyles = css`
  .react-datepicker__week-number {
    color: ${({ theme }) => theme.colors.gray2};
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
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

const sharedDateStyles = css`
  ${({ theme: { colors, datepickerColors } }) =>
    [
      '.react-datepicker__day',
      '.react-datepicker__month-text',
      '.react-datepicker__quarter-text',
      '.react-datepicker__year-text'
    ].reduce(
      (generatedCss, selector) => css`
        ${generatedCss}
        ${selector} {
          &:hover {
            border-radius: 0.3rem;
            background-color: ${colors.gray3};
          }
          &--today {
            font-weight: bold;
          }

          &--highlighted {
            border-radius: 0.3rem;
            background-color: ${datepickerColors.highlight};
            color: ${colors.white};
            &:hover {
              background-color: ${datepickerColors.highlightHover};
              color: ${colors.gray9};
            }
          }

          &--selected,
          &--in-selecting-range,
          &--in-range {
            border-radius: 0.3rem;
            background-color: ${datepickerColors.selected};
            color: ${colors.white};

            &:hover {
              background-color: ${datepickerColors.hover};
              color: ${colors.white};
            }
          }

          &--keyboard-selected {
            border-radius: 0.3rem;
            background-color: ${datepickerColors.keyboard};
            color: ${colors.white};

            &:hover {
              background-color: ${datepickerColors.hover};
              color: ${colors.white};
            }
          }

          &--in-selecting-range {
            background-color: ${datepickerColors.inRange};
            color: ${colors.gray9};
          }

          .react-datepicker__month--selecting-range &--in-range {
            background-color: ${colors.gray3};
            color: ${colors.gray9};
          }

          &--disabled {
            cursor: default;
            color: ${colors.gray5};
            &:hover {
              background-color: transparent;
              color: ${colors.gray5};
            }
          }
        }
      `,
      css``
    )}

  ${({ theme }) =>
    [
      '.react-datepicker__month-text',
      '.react-datepicker__quarter-text'
    ].reduce<CSSReturn>((generatedCss, selector) => {
      const textHover = css`
        ${generatedCss}
        ${selector}:hover {
          background-color: ${theme.colors.gray3};
          color: ${theme.colors.gray9};
        }
      `;
      const finalCss = [
        '.react-datepicker__month',
        '.react-datepicker__quarter'
      ]
        .map(parent => `${parent}${selector}`)
        .reduce(
          (innerCss, sel) => css`
            ${innerCss}
            ${sel} {
              &--selected:hover,
              &--in-range:hover {
                background-color: ${theme.datepickerColors.selected};
              }
            }
          `,
          textHover
        );
      return finalCss;
    }, css``)}

  ${({ theme }) =>
    [
      '.react-datepicker__year',
      '.react-datepicker__month',
      '.react-datepicker__month-year'
    ].reduce<CSSReturn>(
      (generatedCss, selector) => css`
        ${generatedCss}
        ${selector} {
          &-read-view {
            border: 1px solid transparent;
            border-radius: 0.3rem;
            color: ${theme.colors.white};
            cursor: pointer;
          }
          &-dropdown {
            background-color: ${theme.colors.gray1};
            position: absolute;
            width: 50%;
            left: 25%;
            top: 30px;
            z-index: 1;
            text-align: center;
            border-radius: 0.3rem;
            border: 1px solid ${theme.colors.gray5};
            cursor: pointer;
          }

          &--scrollable {
            height: 150px;
            overflow-y: scroll;
          }

          &-option {
            line-height: 20px;
            width: 100%;
            display: block;
            margin-left: auto;
            margin-right: auto;

            &:first-of-type {
              border-top-left-radius: 0.3rem;
              border-top-right-radius: 0.3rem;
            }

            &:last-of-type {
              user-select: none;
              border-bottom-left-radius: 0.3rem;
              border-bottom-right-radius: 0.3rem;
            }
            &:hover {
              background-color: ${({ theme }) => theme.colors.gray3};
            }

            &--selected {
              position: absolute;
              left: 15px;
            }
          }
        }
      `,
      css``
    )}
`;

const auxiliaryStyles = css`
  .react-datepicker__close-icon {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
    padding: 0px 6px 0px 0px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    &:after {
      cursor: pointer;
      background-color: ${({ theme }) => theme.datepickerColors.selected};
      color: ${({ theme }) => theme.colors.white};
      border-radius: 0.5em;
      height: 16px;
      width: 16px;
      padding: 2px;
      font-size: 12px;
      line-height: 1;
      text-align: center;
      display: table-cell;
      vertical-align: middle;
      content: '\\00d7';
    }
  }

  .react-datepicker__today-button {
    background: ${({ theme }) => theme.colors.gray1};
    border-top: 1px solid ${({ theme }) => theme.colors.gray5};
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
    background-color: ${({ theme }) => theme.colors.boxShadowDark};
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 2147483647;
  }
`;

const containerStyles = css`
  .react-datepicker-wrapper {
    display: inline-block;
    padding: 0;
    border: 0;
  }

  .react-datepicker__input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .react-datepicker {
    max-width: fit-content;
  }

  .react-datepicker-popper .react-datepicker__triangle {
    display: none;
  }
`;

export const DatepickerStyles = createGlobalStyle`
${ariaStyles}
${containerStyles}
${downArrowStyles}
${timeStyles}
${popperStyles}
${headerStyles}
${dropdownStyles}
${navigationStyles}
${dayStyles}
${monthStyles}
${yearStyles}
${weekStyles}
${sharedDateStyles}
${auxiliaryStyles}
`;
