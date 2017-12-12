/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import ModalBody from './ModalBody';
import defaultTheme from '../../theme/defaultTheme';

describe('modal Body component', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <ThemeProvider theme={defaultTheme}>
        <ModalBody className="Body">This is the Body.</ModalBody>
      </ThemeProvider>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
