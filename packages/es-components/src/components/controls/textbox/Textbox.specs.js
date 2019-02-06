/* eslint-env jest */

import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';
import { renderWithTheme } from '../../util/test-utils';

import Control from '../Control';
import Label from '../label/Label';
import Textbox from './Textbox';

beforeEach(cleanup);

const buildTextbox = props => (
  <Control>
    <Label for="test">Text</Label>
    <Textbox id="test" {...props} />
  </Control>
);

it('executes the handleOnChange function when text is changed', () => {
  const props = {
    onChange: jest.fn()
  };
  const { getByLabelText } = renderWithTheme(buildTextbox(props));

  fireEvent.change(getByLabelText('Text'), {
    target: { value: '112' }
  });
  expect(props.onChange).toHaveBeenCalled();
});

it('executes handleOnBlur when input focus is lost', () => {
  const props = {
    onBlur: jest.fn()
  };
  const { getByLabelText } = renderWithTheme(buildTextbox(props));

  fireEvent.blur(getByLabelText('Text'));
  expect(props.onBlur).toHaveBeenCalled();
});

it('renders addons when provided', () => {
  function getNumberOfIcons(props) {
    const { container } = renderWithTheme(buildTextbox(props));
    return container.querySelectorAll('i').length;
  }

  expect(getNumberOfIcons({ prependIconName: 'prepend' })).toBe(1);
  expect(getNumberOfIcons({ appendIconName: 'append' })).toBe(1);
  expect(getNumberOfIcons({ prependIconName: 'prepend', appendIconName: 'append' })).toBe(2);
});

it('applies mask to changed value', () => {
  const props = {
    maskType: 'ssnum'
  };
  const { getByLabelText } = renderWithTheme(buildTextbox(props));

  fireEvent.change(getByLabelText('Text'), { target: {
    value: '123452323'
  }});

  expect(getByLabelText('Text').value).toBe('123-45-2323');
});

it('updates mask properly', () => {
  const props = {
    maskType: 'ssnum'
  };
  const { getByLabelText } = renderWithTheme(buildTextbox(props));

  fireEvent.change(getByLabelText('Text'), { target: {
    value: '8'
  }});

  expect(getByLabelText('Text').value).toBe('8\u2000\u2000-\u2000\u2000-\u2000\u2000\u2000\u2000')
});
