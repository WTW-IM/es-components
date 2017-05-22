/* eslint-env jest */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Alert from './Alert';

import Icon from '../../icons/Icon';
import Button from '../../../controls/buttons/Button';

let instanceToRender;

beforeEach(() => {
  instanceToRender = (
    <Alert
      type="success"
      header="alert header"
      additionalText="test alert text"
    />
  );
});

function getShallowInstance() {
  return shallow(instanceToRender);
}

function getMountedInstance(props) {
  mount(instanceToRender);
  return mount(instanceToRender).setProps(props);
}

it('alert has the alert role', () => {
  const instance = getShallowInstance();
  expect(instance.prop('role')).toBe('alert');
});

it('header text is emphasized by strong tag', () => {
  const instance = getShallowInstance();
  expect(instance.find('strong').text()).toBe('alert header');
});

it('alert has dismissable button when dismissable is true', () => {
  const instance = getMountedInstance();
  expect(instance.find('.alert__dismiss').length).toBe(0);

  instance.setProps({ dismissable: true });

  expect(instance.find('.alert__dismiss').length).toBe(1);
});

it('alert prepends icon appropriate to type when includeIcon is true', () => {
  const instance = getMountedInstance();
  expect(instance.find(Icon).length).toBe(0);

  instance.setProps({ includeIcon: true });

  expect(instance.find(Icon).length).toBe(1);
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

  const instanceProps = { callsToAction };

  let instance;

  beforeEach(() => {
    instance = getMountedInstance(instanceProps);
  });

  it('adds a Button instance for all calls to action', () => {
    const buttons = instance.find(Button);

    expect(buttons.length).toBe(3);
  });

  it('executes callToAction function provided to the button', () => {
    const button = instance.find(Button).first();

    button.simulate('click');

    expect(primaryAction.mock.calls.length).toBe(1);
  });
});
