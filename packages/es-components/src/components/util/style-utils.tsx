import { css } from 'styled-components';

export const baseFontCss = css`
  font-family: ${({
    theme: {
      font: { baseFontFace }
    }
  }) => baseFontFace};
`;
