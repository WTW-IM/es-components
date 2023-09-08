import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from '../../util/test-utils';

import Control from '../Control';
import Label from '../label/Label';
import Textbox, { TextboxProps } from './Textbox';

const TestTextbox = (props: TextboxProps) => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <Textbox id="test" {...props} />
  </Control>
);

it('executes the handleOnChange function when text is changed', () => {
  const props = {
    onChange: jest.fn()
  };
  renderWithTheme(<TestTextbox {...props} />);

  fireEvent.change(screen.getByLabelText('Text'), {
    target: { value: '112' }
  });
  expect(props.onChange).toHaveBeenCalled();
});

it('executes handleOnBlur when input focus is lost', () => {
  const props = {
    onBlur: jest.fn()
  };
  renderWithTheme(<TestTextbox {...props} />);

  fireEvent.blur(screen.getByLabelText('Text'));
  expect(props.onBlur).toHaveBeenCalled();
});

test.each<TextboxProps>([
  { prependIconName: 'phone', appendIconName: undefined },
  { prependIconName: undefined, appendIconName: 'user' },
  { prependIconName: 'phone', appendIconName: 'user' }
])('renders the correct addons when provided', props => {
  const { container } = renderWithTheme(<TestTextbox {...props} />);

  expect(container).toMatchSnapshot();
});
