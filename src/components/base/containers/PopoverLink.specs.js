/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import PopoverLink from './PopoverLink';

describe('popoverLink component', () => {
  let instanceToRender;
  const onPopoverHidden = jest.fn();

  beforeEach(() => {
    instanceToRender = (
      <PopoverLink
        popoverTitle="Popover Title"
        popoverContent="This is a popover."
        onPopoverHidden={onPopoverHidden}
      >
        This is the popover link text.
      </PopoverLink>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets isOpen state when link is clicked', () => {
    const popoverInstance = mount(instanceToRender);
    const button = popoverInstance.find('[data-trigger="focus"]');

    expect(popoverInstance.state().isOpen).toBe(false);

    button.simulate('click');
    expect(popoverInstance.state().isOpen).toBe(true);
  });

  it('calls onPopoverHidden once when popover is closed', () => {
    const popoverInstance = mount(instanceToRender);
    const button = popoverInstance.find('[data-trigger="focus"]');

    button.simulate('click');
    expect(popoverInstance.state().isOpen).toBe(true);

    button.simulate('click');
    expect(popoverInstance.state().isOpen).toBe(false);
    expect(onPopoverHidden.mock.calls.length).toBe(1);
  });
});
