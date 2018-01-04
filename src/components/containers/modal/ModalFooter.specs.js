/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../../theme/defaultTheme';
import ModalFooter from './ModalFooter';

describe('modal footer component', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <ThemeProvider theme={defaultTheme}>
        <ModalFooter className="footer">This is the footer.</ModalFooter>
      </ThemeProvider>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
