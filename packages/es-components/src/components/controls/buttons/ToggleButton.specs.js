/* eslint-env jest */

import React from 'react';
import { mountWithTheme } from '../../../testing';
import viaTheme from 'es-components-via-theme';

import { ToggleButton } from './ToggleButton';

let instance;
const onClick = jest.fn();

beforeEach(() => {
  instance = mountWithTheme(
    <ToggleButton handleOnClick={onClick} theme={viaTheme}>
      test
    </ToggleButton>
  );
});

it('sets isPressed state on click', () => {
  instance.simulate('click');
  expect(instance.state().isPressed).toBe(true);
  instance.simulate('click');
  expect(instance.state().isPressed).toBe(false);
});
