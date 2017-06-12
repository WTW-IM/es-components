/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import ModalBody from './ModalBody';

describe('modal Body component', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <ModalBody className="Body">This is the Body.</ModalBody>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
