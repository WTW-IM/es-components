import React from 'react';
import { createGlobalStyle, css, useTheme } from 'styled-components';
import { globalAnchorCss } from '../../navigation/Anchor';
import { globalHeadingsCss } from '../../containers/heading/Heading';
import { globalButtonCss } from '../../controls/buttons/Button';
import { globalInputCss } from '../../controls/textbox/InputBase';
import { baseFontCss } from '../../util/style-utils';
import { globalDrowdownCss } from '../../controls/dropdown/Dropdown';

export const globalStyleDefaults = css`
  body,
  p {
    ${baseFontCss}
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

  ${globalAnchorCss}
  ${globalHeadingsCss}
  ${globalButtonCss}
  ${globalInputCss}
  ${globalDrowdownCss}
`;

export const GlobalStyles = createGlobalStyle`
  ${globalStyleDefaults}
`;

export default function GlobalStyleDefaults() {
  const theme = useTheme();

  return theme?.font ? <GlobalStyles /> : <></>;
}
