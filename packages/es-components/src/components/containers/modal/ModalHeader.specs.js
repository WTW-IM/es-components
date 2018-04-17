/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import ModalHeader from './ModalHeader';

const buildHeader = props => (
  <ThemeProvider theme={viaTheme}>
    <ModalHeader className="header" {...props} />
  </ThemeProvider>
);

describe('modal header component', () => {
  it('renders with close button', () => {
    const tree = renderer
      .create(
        buildHeader({ children: 'This is the header with close button.' })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without close button', () => {
    const tree = renderer
      .create(
        buildHeader({
          hideCloseButton: true,
          children: 'This is the header without close button.'
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
