/* eslint-env jest */

import React from 'react';
import { cleanup } from 'react-testing-library';

import TabPanel from './TabPanel';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

it('displays first tab when rendered', () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel>
      <TabPanel.Tab header="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab header="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  expect(getByText('Tab number 1')).toBeVisible();
  expect(queryByText('Tab number 2')).toBeNull();
});

it('displays content for selected key when corresponding button is clicked', () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel selectedKey="tab 2">
      <TabPanel.Tab header="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab header="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  expect(queryByText('Tab number 1')).toBeNull();
  expect(getByText('Tab number 2')).toBeVisible();
});
