/* eslint-env jest */

import React from 'react';
import { cleanup } from 'react-testing-library';

import TabPanel from './TabPanel';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

it('displays first tab when rendered', () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  expect(getByText('Tab number 1')).toBeVisible();
  expect(queryByText('Tab number 2')).toBeNull();
});

it('displays content for tab when corresponding button is clicked', () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  getByText('tab 2').click();

  expect(queryByText('Tab number 1')).toBeNull();
  expect(getByText('Tab number 2')).toBeVisible();
});
