import { css } from 'styled-components';

export const getTriangleSvgBg = color => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg version="1.0" viewBox="0 0 351 351" xmlns="http://www.w3.org/2000/svg"><path transform="matrix(0 1 -1 0 351 0)" d="m0 0v351h351l-351-351z" fill="${color}"/></svg>`;
  return `url('data:image/svg+xml;base64,${btoa(svg)}')`;
};

export const calendarArrowStyles = css`
  &:before {
    content: '';
    width: 1em;
    height: 1em;
    background-color: transparent;
    background-image: ${({ theme }) => getTriangleSvgBg(theme.colors.white)};
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top left;
    box-sizing: border-box;
    position: absolute;
    pointer-events: none;
    border: 1px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.gray5};
    border-left-color: ${({ theme }) => theme.colors.gray5};
    border-top-left-radius: 1px;

    .react-datepicker-popper[data-placement^='bottom'] &,
    .react-datepicker-popper[data-placement^='top'] & {
      left: 50%;
    }

    .react-datepicker-popper[data-placement^='top'] & {
      bottom: calc(-1em + 3px);
      transform: rotate(225deg) translateX(50%);
    }

    .react-datepicker-popper[data-placement^='bottom'] & {
      top: 0;
      transform: rotate(45deg) translateX(-50%);
      background-image: ${({ theme }) =>
        getTriangleSvgBg(theme.datepickerColors.dpBackground)};
    }

    .react-datepicker-popper[data-placement^='left'] &,
    .react-datepicker-popper[data-placement^='right'] & {
      top: 50%;
    }

    .react-datepicker-popper[data-placement^='right'] & {
      left: -2px;
      transform: rotate(-45deg) translateY(-50%);
    }

    .react-datepicker-popper[data-placement^='left'] & {
      right: calc(-1em + 3px);
      transform: rotate(135deg) translateY(50%);
    }

    .react-datepicker-popper[data-placement^='top'].has-children & {
      background-image: ${() => getTriangleSvgBg('whitesmoke')};
    }
  }
`;
