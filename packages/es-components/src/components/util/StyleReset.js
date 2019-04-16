import { createGlobalStyle } from 'styled-components';

const StyleReset = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  a, big, cite, code, del, dfn, em, img, ins, kbd,
  q, s, samp, strike, tt, var,
  b, u, i, center, dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    border: 0;
    font: inherit;
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  input, button {
    font: inherit;
  }

  ol, ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  h1, h2, h3, h4, h5, h6 {
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

export default StyleReset;
