import { createGlobalStyle, css } from 'styled-components';
import { globalStyleDefaults } from '../base/global-styles/GlobalStyleDefaults';
import { baseFontCss } from './style-utils';

const styleResetCss = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  a,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  strike,
  tt,
  var,
  b,
  u,
  i,
  center,
  fieldset,
  form,
  label,
  legend table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    border: 0;
    ${baseFontCss}
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  *:focus-visible,
  input:focus-visible,
  select:focus-visible,
  button:focus-visible {
    outline: 3px solid #3dbbdb;
  }

  ul,
  ol {
    margin: 0 1em 25px;
    padding-left: 1em;
    list-style-position: outside;
  }

  input,
  button {
    font: inherit;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  small {
    font-size: 85%;
  }

  strong,
  b {
    ${baseFontCss}
    font-weight: bold;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${baseFontCss}
    color: inherit;
    font: inherit;
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 0.45em;
    margin-top: 0;
  }

  h1 {
    font-size: 44.78976px;
  }
  h2 {
    font-size: 37.3248px;
  }
  h3 {
    font-size: 31.104px;
  }
  h4 {
    font-size: 25.92px;
  }
  h5 {
    font-size: 21.6px;
  }
  h6 {
    font-size: 18px;
  }
`;

const StyleReset = createGlobalStyle<{ optOutGlobalStyle?: boolean }>`
  ${styleResetCss}
  ${({ optOutGlobalStyle }) => !optOutGlobalStyle && globalStyleDefaults}
`;

export default StyleReset;
