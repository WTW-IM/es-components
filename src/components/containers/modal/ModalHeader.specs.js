/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import ModalHeader from './ModalHeader';

describe('modal header component', () => {
  let instanceToRender;

  it('renders with close button', () => {
    instanceToRender = (
      <ModalHeader className="header">
        This is the header with close button.
      </ModalHeader>
    );

    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without close button', () => {
    instanceToRender = (
      <ModalHeader className="header" closeButton={false}>
        This is the header without close button.
      </ModalHeader>
    );

    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
