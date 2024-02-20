import { createGlobalStyle, css } from 'styled-components';
import { anchorCss } from '../navigation/Anchor';
import {
  headingBaseCss,
  globalHeadingSizesCss
} from '../containers/heading/Heading';

export const baseFontCss = css`
  font-family: ${({
    theme: {
      font: { baseFontFace }
    }
  }) => baseFontFace};
`;

export const globalStyleDefaults = css`
  body,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${baseFontCss}
  }

  body,
  p {
    font-size: 1.125rem;
    line-height: 1.5em;
  }

  p {
    margin: 0 auto 1em;
  }

  a {
    ${anchorCss}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${headingBaseCss}
  }
  ${globalHeadingSizesCss}
`;

export const GlobalStyleDefaults = createGlobalStyle`
  ${globalStyleDefaults}
`;

export default GlobalStyleDefaults;
