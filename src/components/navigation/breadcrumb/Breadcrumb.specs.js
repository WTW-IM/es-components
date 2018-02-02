/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Breadcrumb from './Breadcrumb';

describe('BreadcrumbTestSuite', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <Breadcrumb keySelector={child => child.props.name}>
        <a href="/test">test</a>
        <a href="/test2">test2</a>
      </Breadcrumb>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Does not have arrow on end', () => {
    const crumbInstance = shallow(instanceToRender);
    const iconInstances = crumbInstance.find({ name: 'chevron-right' });
    expect(iconInstances).toHaveLength(1);
  });
});
