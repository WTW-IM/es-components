/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import ModalFooter from './ModalFooter';

describe('modal footer component', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <ModalFooter className="footer">This is the footer.</ModalFooter>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
