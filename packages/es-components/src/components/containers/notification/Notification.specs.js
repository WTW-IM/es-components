/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Notification from './Notification';

import Button from '../../controls/buttons/Button';

it('notification has the dialog role by default', () => {
  const { queryByRole } = render(
    <ThemeProvider theme={viaTheme}>
      <Notification type="success" />
    </ThemeProvider>
  );
  expect(queryByRole('dialog')).not.toBeNull();
});

it('notification has the alert role when isAlert prop is true', () => {
  const { queryByRole } = render(
    <ThemeProvider theme={viaTheme}>
      <Notification type="success" isAlert />
    </ThemeProvider>
  );
  expect(queryByRole('alert')).not.toBeNull();
});

it('dismissable notifications render button to dismiss', () => {
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <Notification type="success" dismissable />
    </ThemeProvider>
  );

  expect(container.querySelector('.notification__dismiss')).not.toBeNull();
});

it('notification prepends icon when includeIcon is true', () => {
  const { container } = render(
    <ThemeProvider theme={viaTheme}>
      <Notification type="success" includeIcon />
    </ThemeProvider>
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
    const { getByText } = render(
      <ThemeProvider theme={viaTheme}>
        <Notification callsToAction={callsToAction} type="success" />
      </ThemeProvider>
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
    const { queryByText } = render(
      <ThemeProvider theme={viaTheme}>
        <Notification type="success" callsToAction={buttonedCallsToAction} />
      </ThemeProvider>
    );
    expect(queryByText('My button')).not.toBeNull();
  });
});

it('adds an ExtraAlert to the notification when provided', () => {
  const alert = { alertText: 'test' };
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Notification extraAlert={alert} type="success" />
    </ThemeProvider>
  );
  expect(queryByText('test')).not.toBeNull();
});

it('displays additionalText is provided', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Notification type="success" additionalText="added text" />
    </ThemeProvider>
  );
  expect(queryByText('added text')).not.toBeNull();
});
