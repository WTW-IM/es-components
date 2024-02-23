import { createGlobalStyle, css } from 'styled-components';
import { anchorCss } from '../../navigation/Anchor';
import {
  headingBaseCss,
  globalHeadingSizesCss
} from '../../containers/heading/Heading';
import { globalButtonCss } from '../../controls/buttons/Button';
import { globalInputCss } from '../../controls/textbox/InputBase';
import { baseFontCss } from '../../util/style-utils';
import { globalDrowdownCss } from '../../controls/dropdown/Dropdown';

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
    line-height: ${({
      theme: {
        font: { baseLineHeight }
      }
    }) => baseLineHeight};
  }

  p {
    margin: 0 0 1em;
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
  ${globalButtonCss}
  ${globalInputCss}
  ${globalDrowdownCss}
`;

export const GlobalStyleDefaults = createGlobalStyle`
  ${globalStyleDefaults}
`;

export default GlobalStyleDefaults;
