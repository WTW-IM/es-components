/* eslint-env jest */

import React from 'react';

import Notification from './Notification';
import { renderWithTheme } from '../../util/test-utils';

import Button from '../../controls/buttons/Button';

it('notification has the dialog role by default', () => {
  const { queryByRole } = renderWithTheme(
    <Notification type="success" />
  );
  expect(queryByRole('dialog')).not.toBeNull();
});

it('notification has the alert role when isAlert prop is true', () => {
  const { queryByRole } = renderWithTheme(
    <Notification type="success" isAlert />
  );
  expect(queryByRole('alert')).not.toBeNull();
});

it('dismissable notifications render button to dismiss', () => {
  const { container } = renderWithTheme(
    <Notification type="success" dismissable />
  );

  expect(container.querySelector('.notification__dismiss')).not.toBeNull();
});

it('notification prepends icon when includeIcon is true', () => {
  const { container } = renderWithTheme(
    <Notification type="success" includeIcon />
  );

  expect(container.querySelector('i')).not.toBeNull();
});

describe('when callsToAction are provided', () => {
  const primaryAction = jest.fn();
  const secondaryAction = jest.fn();
  const tertiaryAction = jest.fn();

  const callsToAction = [
    {
      actionButtonContent: 'primary',
      action: primaryAction
    },
    {
      actionButtonContent: 'secondary',
      action: secondaryAction
    },
    {
      actionButtonContent: 'tertiary',
      action: tertiaryAction
    }
  ];

  it('each calls to action is executable', () => {
    const { getByText } = renderWithTheme(
      <Notification callsToAction={callsToAction} type="success" />
    );
    getByText('primary').click();
    expect(primaryAction).toHaveBeenCalled();

    getByText('secondary').click();
    expect(secondaryAction).toHaveBeenCalled();

    getByText('tertiary').click();
    expect(tertiaryAction).toHaveBeenCalled();
  });

  it('allows components to be provided directly', () => {
    const myButton = (
      <Button id="myButton" handleOnClick={jest.fn()}>
        My button
      </Button>
    );
    const buttonedCallsToAction = [
      callsToAction[0],
      myButton,
      callsToAction[2]
    ];
    const { queryByText } = renderWithTheme(
      <Notification type="success" callsToAction={buttonedCallsToAction} />
    );
    expect(queryByText('My button')).not.toBeNull();
  });
});

it('adds an ExtraAlert to the notification when provided', () => {
  const alert = { alertText: 'test' };
  const { queryByText } = renderWithTheme(
    <Notification extraAlert={alert} type="success" />
  );
  expect(queryByText('test')).not.toBeNull();
});

it('displays additionalText is provided', () => {
  const { queryByText } = renderWithTheme(
    <Notification type="success" additionalText="added text" />
  );
  expect(queryByText('added text')).not.toBeNull();
});
