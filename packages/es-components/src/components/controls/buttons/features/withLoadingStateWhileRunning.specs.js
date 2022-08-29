/* eslint-env jest */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';
import { renderWithTheme } from '../../../util/test-utils';
import { withLoadingStateWhileRunning } from './withLoadingStateWhileRunning';

const LoaderButton = withLoadingStateWhileRunning(Button);
let resolve = () => ({});
let reject = () => ({});

afterEach(() => {
  resolve();
});

const loadingContent = 'Loading...';
const defaultContent = 'Click Me!';
const load = () =>
  new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

const generateLoaderButton = (onClick = load) =>
  renderWithTheme(
    <LoaderButton showWhileRunning={loadingContent} onClick={onClick}>
      {defaultContent}
    </LoaderButton>
  );

it('renders a loading state while running', async () => {
  const user = userEvent.setup();
  generateLoaderButton();

  await user.click(screen.getByText(defaultContent));

  const loadingElement = await screen.findByText(loadingContent);
  expect(loadingElement.hasAttribute('data-waiting')).toBe(true);

  resolve();

  const completedElement = await screen.findByText(defaultContent);
  expect(completedElement.hasAttribute('data-waiting')).toBe(false);
});

it('renders the default state after rejection', async () => {
  const user = userEvent.setup();
  const rejectedLoad = () =>
    new Promise((res, rej) => {
      reject = rej;
    }).then(
      () => ({}),
      () => {
        // we have appropriately rejected
      }
    );
  generateLoaderButton(rejectedLoad);

  await user.click(screen.getByText(defaultContent));

  reject();

  const completedElement = await screen.findByText(defaultContent);
  expect(completedElement.hasAttribute('data-waiting')).toBe(false);
});
