/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';

import Popover from './Popover';

describe('popover component', () => {
  const instanceToRender = (
    <Popover
      name="popTest"
      title="Popover Title"
      content="This is the popover content."
    >
      Popover Text
    </Popover>
  );

  function getMountedInstance(props) {
    mount(instanceToRender);
    return mount(instanceToRender).setProps(props);
  }

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('popover body has close button when hasCloseButton is true', () => {
    const instance = getMountedInstance();
    // Length starts at 1 to account for the popover trigger button
    expect(instance.find(Button).length).toBe(1);

    instance.setProps({ hasCloseButton: true });

    expect(instance.find(Button).length).toBe(2);
  });

  it('popover header has alternate close button when hasAltCloseButton is true', () => {
    const instance = getMountedInstance();
    expect(instance.find(Icon).length).toBe(0);

    instance.setProps({ hasAltCloseButton: true });

    expect(instance.find(Icon).length).toBe(1);
  });
});
