/* eslint-disable no-console */
/* eslint-env jest */

import React from 'react';
import { cleanup, waitFor } from '@testing-library/react';

import TabPanel from './TabPanel';
import { renderWithTheme } from '../../util/test-utils';

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
// see https://github.com/testing-library/@testing-library/react/tree/644673975a1c2c375518c5ad804e65e651aeedca#suppressing-unnecessary-warnings-on-react-dom-168
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

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

it('displays content for tab when corresponding button is clicked', async () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  getByText('tab 2').click();

  await waitFor(() => {
    expect(queryByText('Tab number 1')).toBeNull();
    expect(getByText('Tab number 2')).toBeVisible();
  });
});

it('tab does not change when canTabChange returns false', async () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel canTabChange={() => false}>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  getByText('tab 2').click();

  await waitFor(() => {
    expect(queryByText('Tab number 2')).toBeNull();
    expect(getByText('Tab number 1')).toBeVisible();
  });
});

it('tab does not change when canTabChange returns Promise of false', async () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel canTabChange={() => Promise.resolve(false)}>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  getByText('tab 2').click();

  await waitFor(() => {
    expect(queryByText('Tab number 2')).toBeNull();
    expect(getByText('Tab number 1')).toBeVisible();
  });
});

it('tab does change when canTabChange returns Promise of true', async () => {
  const { getByText, queryByText } = renderWithTheme(
    <TabPanel canTabChange={() => Promise.resolve(true)}>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  getByText('tab 2').click();

  await waitFor(() => {
    expect(queryByText('Tab number 1')).toBeNull();
    expect(getByText('Tab number 2')).toBeVisible();
  });
});
