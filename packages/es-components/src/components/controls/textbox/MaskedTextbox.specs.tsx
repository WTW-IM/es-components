import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../util/test-utils';

import Control from '../Control';
import Label from '../label/Label';
import MaskedTextbox, { MaskedTextboxProps } from './MaskedTextbox';

const TestTextbox = (props: MaskedTextboxProps) => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <MaskedTextbox id="test" {...props} />
  </Control>
);

it('applies mask to changed value', async () => {
  const props: MaskedTextboxProps = {
    maskType: 'ssnum'
  };
  renderWithTheme(<TestTextbox {...props} />);

  const input = await screen.findByLabelText('Text');
  await userEvent.type(input, '123452323');

  expect(input).toHaveValue('123-45-2323');
});

it('updates mask properly', async () => {
  const props: MaskedTextboxProps = {
    maskType: 'ssnum'
  };
  renderWithTheme(<TestTextbox {...props} />);

  const input = await screen.findByLabelText('Text');
  await userEvent.type(input, '8');

  expect(input).toHaveValue(
    '8\u2000\u2000-\u2000\u2000-\u2000\u2000\u2000\u2000'
  );
});
