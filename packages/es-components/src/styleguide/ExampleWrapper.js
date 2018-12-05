/* eslint-disable react/prop-types */

import React, { createElement } from 'react';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

export default function ExampleWrapper(props) {
  const WrapperType = React.StrictMode;
  return createElement(
    WrapperType,
    {},
    createElement(ThemeProvider, { theme: viaTheme }, props.children)
  );
}
