import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from '../../util/test-utils';

import Control from '../Control';
import Label from '../label/Label';
import Textbox from './Textbox';

const buildTextbox = props => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <Textbox id="test" {...props} />
  </Control>
);

it('executes the handleOnChange function when text is changed', () => {
  const props = {
    onChange: jest.fn()
  };
  renderWithTheme(buildTextbox(props));

  fireEvent.change(screen.getByLabelText('Text'), {
    target: { value: '112' }
  });
  expect(props.onChange).toHaveBeenCalled();
});

it('executes handleOnBlur when input focus is lost', () => {
  const props = {
    onBlur: jest.fn()
  };
  renderWithTheme(buildTextbox(props));

  fireEvent.blur(screen.getByLabelText('Text'));
  expect(props.onBlur).toHaveBeenCalled();
});

/* eslint-disable testing-library/no-node-access */
test.each([
  { prependIconName: 'prepend', appendIconName: undefined },
  { prependIconName: undefined, appendIconName: 'append' },
  { prependIconName: 'prepend', appendIconName: 'append' }
])('renders the correct addons when provided', props => {
  const { container } = renderWithTheme(buildTextbox(props));

  expect(container.firstChild).toMatchSnapshot();
});
/* eslint-enable testing-library/no-node-access */
