/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import PopoverLink from './PopoverLink';

describe('popoverLink component', () => {
  it('renders popoverLink children', () => {
    const tree = renderer.create(
      <PopoverLink popoverTitle="Popover Title" popovercontent="This is a popover.">
        This is the popover link text.
      </PopoverLink>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
