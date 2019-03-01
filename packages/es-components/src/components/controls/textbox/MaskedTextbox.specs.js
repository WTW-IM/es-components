/* eslint-env jest */

import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';
import { renderWithTheme } from '../../util/test-utils';

import Control from '../Control';
import Label from '../label/Label';
import MaskedTextbox from './MaskedTextbox';

beforeEach(cleanup);

const buildTextbox = props => (
  <Control>
    <Label htmlFor="test">Text</Label>
    <MaskedTextbox id="test" {...props} />
  </Control>
);

it('applies mask to changed value', () => {
  const props = {
    maskType: 'ssnum'
  };
  const { getByLabelText } = renderWithTheme(buildTextbox(props));

  fireEvent.change(getByLabelText('Text'), {
    target: {
      value: '123452323'
    }
  });

  expect(getByLabelText('Text').value).toBe('123-45-2323');
});

it('updates mask properly', () => {
  const props = {
    maskType: 'ssnum'
  };
  const { getByLabelText } = renderWithTheme(buildTextbox(props));

  fireEvent.change(getByLabelText('Text'), {
    target: {
      value: '8'
    }
  });

  expect(getByLabelText('Text').value).toBe(
    '8\u2000\u2000-\u2000\u2000-\u2000\u2000\u2000\u2000'
  );
});
