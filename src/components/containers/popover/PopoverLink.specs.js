/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import PopoverLink from './PopoverLink';

describe('popoverLink component', () => {
  const onPopoverHidden = jest.fn();
  const onToggle = jest.fn();

  const instanceToRender = (
    <PopoverLink
      popoverTitle="Popover Title"
      popoverContent="This is a popover."
      onPopoverHidden={onPopoverHidden}
      onToggle={onToggle}
    >
      This is the popover link text.
    </PopoverLink>
  );

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onToggle when link is clicked', () => {
    const popoverInstance = mount(instanceToRender);
    const button = popoverInstance.find('[data-trigger="focus"]');

    button.simulate('click');
    expect(onToggle).toHaveBeenCalled();
  });

  it('calls onPopoverHidden once when popover is closed', () => {
    const popoverInstance = mount(instanceToRender);
    const button = popoverInstance.find('[data-trigger="focus"]');

    button.simulate('click');
    expect(onToggle).toHaveBeenCalled();
    button.simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onPopoverHidden).toHaveBeenCalled();
  });
});
