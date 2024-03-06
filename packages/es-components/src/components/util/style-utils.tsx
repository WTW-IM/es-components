import { css } from 'styled-components';

export const baseFontCss = css`
  ${({ theme }) =>
    theme?.font &&
    css`
      font-family: ${theme.font.baseFontFace};
    `}
`;
