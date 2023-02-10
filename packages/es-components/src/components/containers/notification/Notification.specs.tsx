import React from 'react';
import { screen } from '@testing-library/react';

import Notification from './Notification';
import { renderWithTheme } from '../../util/test-utils';
import userEvent from '@testing-library/user-event';

it('notification has the dialog role by default', () => {
  renderWithTheme(<Notification type="success" />);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('notification has the alert role when role is "alert"', () => {
  renderWithTheme(<Notification type="success" role="alert" />);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

it('notification prepends icon when includeIcon is true', () => {
  const { container } = renderWithTheme(
    <Notification type="success" includeIcon />
  );

  // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
  expect(container.querySelector('.bds-ok-circle')).toBeInTheDocument();
});

it('can take an extra className', async () => {
  renderWithTheme(
    <Notification type="success" className="my-success">
      My Notification
    </Notification>
  );

  expect(
    // eslint-disable-next-line testing-library/no-node-access
    (await screen.findByText('My Notification')).parentElement
  ).toHaveClass('my-success');
});

it('can take styles', async () => {
  renderWithTheme(
    <Notification type="success" style={{ color: 'blue' }}>
      My Notification
    </Notification>
  );
  const notificationDiv = await screen.findByText('My Notification');
  expect(notificationDiv).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-node-access
  expect(notificationDiv.parentElement).toHaveStyle('color: blue');
});

describe('dismissable notifications', () => {
  it('removes notification when dismiss button is clicked', async () => {
    renderWithTheme(
      <Notification type="success" isDismissable>
        <p id="find-me">I am here!</p>
      </Notification>
    );
    expect(await screen.findByText('I am here!')).toBeInTheDocument();

    const button = await screen.findByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.queryByText('I am here!')).not.toBeInTheDocument();
  });

  it('invokes the passed "onDismiss" function', async () => {
    const onDismiss = jest.fn();
    renderWithTheme(
      <Notification type="success" isDismissable onDismiss={onDismiss}>
        <p id="find-me">I am here!</p>
      </Notification>
    );

    const button = await screen.findByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();

    expect(await screen.findByText('I am here!')).toBeInTheDocument();

    await userEvent.click(button);
    expect(onDismiss).toHaveBeenCalled();
  });
});
