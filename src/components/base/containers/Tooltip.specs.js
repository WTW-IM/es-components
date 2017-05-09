/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import Tooltip from './Tooltip';

describe('tooltip component', () => {
  it('renders tooltip children', () => {
    const tree = renderer
      .create(
        <Tooltip content="This is a tooltip">
          This is the tooltip target.
        </Tooltip>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
