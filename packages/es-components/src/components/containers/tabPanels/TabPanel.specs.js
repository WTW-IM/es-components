/* eslint-env jest */

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import TabPanel from './TabPanel';

beforeEach(cleanup);

it('displays first tab when rendered', () => {
  const { getByText, queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <TabPanel>
        <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
        <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
      </TabPanel>
    </ThemeProvider>
  );

  expect(getByText('Tab number 1')).toBeVisible();
  expect(queryByText('Tab number 2')).toBeNull();
});

it('displays content for tab when corresponding button is clicked', () => {
  const { getByText, queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <TabPanel>
        <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
        <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
      </TabPanel>
    </ThemeProvider>
  );

  getByText('tab 2').click();

  expect(queryByText('Tab number 1')).toBeNull();
  expect(getByText('Tab number 2')).toBeVisible();
});

it('invokes the passed tabChanged prop only when the tab changes', () => {
  const tabChanged = jest.fn();
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <TabPanel tabChanged={tabChanged}>
        <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
        <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
      </TabPanel>
    </ThemeProvider>
  );

  const secondTab = getByText('tab 2');

  secondTab.click();
  expect(tabChanged).toHaveBeenCalled();

  tabChanged.mockClear();

  secondTab.click();
  expect(tabChanged).not.toHaveBeenCalled();

  getByText('tab 1').click();
  expect(tabChanged).toHaveBeenCalled();
});
