/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import ModalBody from './ModalBody';

describe('modal Body component', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <ThemeProvider theme={viaTheme}>
        <ModalBody className="Body">This is the Body.</ModalBody>
      </ThemeProvider>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
