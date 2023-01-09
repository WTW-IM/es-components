/* eslint-env jest */

import React from 'react';
import { waitFor } from '@testing-library/react';

import Notification from './Notification';
import { renderWithTheme } from '../../util/test-utils';

it('notification has the dialog role by default', () => {
  const { queryByRole } = renderWithTheme(<Notification type="success" />);
  expect(queryByRole('dialog')).not.toBeNull();
});

it('notification has the alert role when role is "alert"', () => {
  const { queryByRole } = renderWithTheme(
    <Notification type="success" role="alert" />
  );
  expect(queryByRole('alert')).not.toBeNull();
});

it('notification prepends icon when includeIcon is true', () => {
  const { container } = renderWithTheme(
    <Notification type="success" includeIcon />
  );

  expect(container.querySelector('i')).not.toBeNull();
});

it('can take an extra className', () => {
  const { container } = renderWithTheme(
    <Notification type="success" className="my-success" />
  );
  expect(container.querySelector('.my-success')).not.toBeNull();
});

it('can take styles', () => {
  const { container } = renderWithTheme(
    <Notification type="success" style={{ color: 'blue' }} />
  );
  const notificationDiv = container.querySelector('div');
  if (notificationDiv === null) throw new Error('div not rendered');
  const styles = window.getComputedStyle(notificationDiv);
  expect(styles.color).toEqual('blue');
});

describe('dismissable notifications', () => {
  it('removes notification when dismiss button is clicked', async () => {
    const { container, getByText } = renderWithTheme(
      <Notification type="success" isDismissable>
        <p id="find-me">I am here!</p>
      </Notification>
    );
    expect(() => getByText('I am here!')).not.toThrow();

    const button = container.querySelector('button');
    if (button === null) throw new Error('button not rendered');
    button.click();

    await waitFor(() => expect(() => getByText('I am here!')).toThrow());
  });

  it('invokes the passed "onDismiss" function', () => {
    const onDismiss = jest.fn();
    const { container } = renderWithTheme(
      <Notification type="success" isDismissable onDismiss={onDismiss}>
        <p id="find-me">I am here!</p>
      </Notification>
    );

    const button = container.querySelector('button');
    if (button === null) throw new Error('button not rendered');
    button.click();

    expect(onDismiss).toHaveBeenCalled();
  });
});
