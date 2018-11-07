/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import moment from 'moment';

import DatePicker from './DatePicker';

it('renders DatePicker when textbox is focused', () => {
  const { getByLabelText, queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <DatePicker
        labelText="Test date"
        onChange={jest.fn()}
        selectedDate={moment(new Date(2018, 10, 7))}
      />
    </ThemeProvider>
  );
  getByLabelText('Test date').focus();
  expect(queryByText('November 2018')).not.toBeNull();
});
