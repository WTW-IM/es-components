import { createGlobalStyle, css } from 'styled-components';

export const baseFontCss = css`
  font-family: ${({
    theme: {
      font: { baseFontFace }
    }
  }) => baseFontFace};
`;

export const globalStyleDefaults = css`
  body,
  p {
    ${baseFontCss}
    font-size: 1.125rem;
    line-height: 1.5em;
  }

  p {
    margin: 0 auto 1.5em;
  }
`;

export const GlobalStyleDefaults = createGlobalStyle`
  ${globalStyleDefaults}
`;

export default GlobalStyleDefaults;
