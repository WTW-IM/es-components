/* eslint-env jest */
import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';
import viaTheme from 'es-components-via-theme';

import { renderWithTheme } from '../../util/test-utils';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import DateOfBirth from './DateOfBirth';

const phoneWidth = parseInt(viaTheme.screenSize.phone, 10);

Object.defineProperty(window.document.body, 'clientWidth', {
  writable: true
});
function setScreenWidth(size) {
  global.document.body.clientWidth = size;
}

beforeEach(cleanup);

const buildDoB = props => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <DateOfBirth id="test" {...props} />
  </Control>
);

it('executes the onChange function when text is changed', () => {
  const props = {
    onChange: jest.fn()
  };
  const { getByLabelText } = renderWithTheme(buildDoB(props));

  fireEvent.change(getByLabelText('Text'), {
    target: { value: '2016-11-05' }
  });
  expect(props.onChange).toHaveBeenCalled();
});

it('renders the native date input when the screen is phone sized', () => {
  setScreenWidth(phoneWidth);
  const props = {
    onChange: jest.fn()
  };
  const { getByLabelText } = renderWithTheme(buildDoB(props));
  const dobElement = getByLabelText('Text');
  expect(dobElement.getAttribute('type')).toBe('date');
});

it('renders the masked input when the screen is phone sized, but we specify the native date picker should not be used', () => {
  setScreenWidth(phoneWidth);
  const props = {
    onChange: jest.fn(),
    allowNativeDatepickerOnMobile: false
  };
  const { getByLabelText } = renderWithTheme(buildDoB(props));
  const dobElement = getByLabelText('Text');
  expect(dobElement.getAttribute('type')).toBe('text');
});

it('renders the masked input when the screen is wider than phone size', () => {
  setScreenWidth(phoneWidth + 1);
  const props = {
    onChange: jest.fn()
  };
  const { getByLabelText } = renderWithTheme(buildDoB(props));
  const dobElement = getByLabelText('Text');
  expect(dobElement.getAttribute('type')).toBe('text');
});
