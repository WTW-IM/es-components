import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

const { childContextTypes } = ThemeProvider;

export function shallowWithTheme(tree, theme = viaTheme) {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();

  return shallow(tree, { context });
}

export function mountWithTheme(tree, theme = viaTheme) {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();

  return mount(tree, { context, childContextTypes });
}

export function renderWithTheme(tree, theme = viaTheme) {
  return renderer.create(<ThemeProvider theme={theme}>{tree}</ThemeProvider>);
}
