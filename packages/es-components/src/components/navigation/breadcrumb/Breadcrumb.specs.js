/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from './Breadcrumb';

describe('BreadcrumbTestSuite', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <Breadcrumb className="test">
        <a href="/test">test</a>
        <a href="/test2">test2</a>
      </Breadcrumb>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
