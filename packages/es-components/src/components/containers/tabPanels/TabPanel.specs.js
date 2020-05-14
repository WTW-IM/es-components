/* eslint-env jest */

import React from 'react';
import { cleanup, wait } from 'react-testing-library';

import TabPanel from './TabPanel';
import { renderWithTheme } from '../../util/test-utils';

/*
  The addition of async support has introduced a strange log message in the tests...
    "When testing, code that causes React state updates should be wrapped into act(...):"
  I was unable to resolve this, but this is where my research led me...
    https://github.com/testing-library/react-testing-library/issues/535#issuecomment-576816390
*/

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

  await wait(() => {
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

  await wait(() => {
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

  await wait(() => {
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

  await wait(() => {
    expect(queryByText('Tab number 1')).toBeNull();
    expect(getByText('Tab number 2')).toBeVisible();
  });
});
