/* eslint-env jest */

import React from 'react';

import { getCallToActionChildren } from './getCallToActionChildren';
import Action from './Action';

it('separates Action elements from all other elements', () => {
  const elements = [
    <div>First</div>,
    <Action>First Action</Action>,
    <Action>Second Action</Action>,
    <p>A paragraph</p>,
    <Action isPrimary>Primary Action</Action>,
    <h3>A third level header</h3>
  ];

  const { actions, nonActions } = getCallToActionChildren(elements);

  expect(actions).toHaveLength(3);
  expect(nonActions).toHaveLength(3);
});
