import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TabPanel from './TabPanel';
import { renderWithTheme } from '../../util/test-utils';

it('displays first tab when rendered', async () => {
  renderWithTheme(
    <TabPanel>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  expect(await screen.findByRole('tabpanel')).toHaveTextContent('Tab number 1');
});

it('displays content for tab when corresponding button is clicked', async () => {
  renderWithTheme(
    <TabPanel>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  await userEvent.click(await screen.findByRole('tab', { name: /tab 2/i }));

  await waitFor(async () =>
    expect(await screen.findByRole('tabpanel')).toHaveTextContent(
      'Tab number 2'
    )
  );
});

it('tab does not change when canTabChange returns false', async () => {
  renderWithTheme(
    <TabPanel canTabChange={() => false}>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  await userEvent.click(await screen.findByRole('tab', { name: /tab 2/i }));

  expect(await screen.findByRole('tabpanel')).toHaveTextContent('Tab number 1');

  // do it twice just to be sure
  await userEvent.click(await screen.findByRole('tab', { name: /tab 2/i }));

  expect(await screen.findByRole('tabpanel')).toHaveTextContent('Tab number 1');
});

it('tab does not change when canTabChange returns Promise of false', async () => {
  renderWithTheme(
    <TabPanel canTabChange={() => Promise.resolve(false)}>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  await userEvent.click(await screen.findByRole('tab', { name: /tab 2/i }));

  expect(await screen.findByRole('tabpanel')).toHaveTextContent('Tab number 1');

  // do it twice just to be sure
  await userEvent.click(await screen.findByRole('tab', { name: /tab 2/i }));

  expect(await screen.findByRole('tabpanel')).toHaveTextContent('Tab number 1');
});

it('tab does change when canTabChange returns Promise of true', async () => {
  renderWithTheme(
    <TabPanel canTabChange={() => Promise.resolve(true)}>
      <TabPanel.Tab name="tab 1">Tab number 1</TabPanel.Tab>
      <TabPanel.Tab name="tab 2">Tab number 2</TabPanel.Tab>
    </TabPanel>
  );

  await userEvent.click(await screen.findByRole('tab', { name: /tab 2/i }));

  await waitFor(async () =>
    expect(await screen.findByRole('tabpanel')).toHaveTextContent(
      'Tab number 2'
    )
  );
});
