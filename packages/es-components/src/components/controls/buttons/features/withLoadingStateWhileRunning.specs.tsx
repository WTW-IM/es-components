import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';
import { renderWithTheme } from '../../../util/test-utils';
import {
  withLoadingStateWhileRunning,
  LoadingStateOnClick
} from './withLoadingStateWhileRunning';
import noop from '../../../util/noop';

const LoaderButton = withLoadingStateWhileRunning(Button);
let resolve: () => void = noop;
let reject = noop;

afterEach(() => {
  resolve();
});

const loadingContent = 'Loading...';
const defaultContent = 'Click Me!';
const load = () =>
  new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });

const generateLoaderButton = (onClick: LoadingStateOnClick = load) =>
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
  expect(loadingElement).toHaveAttribute('data-waiting');

  resolve();

  const completedElement = await screen.findByText(defaultContent);
  expect(completedElement).not.toHaveAttribute('data-waiting');
});

it('renders the default state after rejection', async () => {
  const user = userEvent.setup();
  const rejectedLoad = () =>
    new Promise((res, rej) => {
      reject = rej;
    }).then(noop, () => {
      // we have appropriately rejected
    });
  generateLoaderButton(rejectedLoad);

  await user.click(screen.getByText(defaultContent));

  reject();

  const completedElement = await screen.findByText(defaultContent);
  expect(completedElement).not.toHaveAttribute('data-waiting');
});
