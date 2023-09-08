import React from 'react';

import OutlineButton from './OutlineButton';
import { renderWithTheme } from '../../util/test-utils';
import { ButtonProps } from './Button';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();

function TestButton(props: Partial<ButtonProps>) {
  const { children, ...otherProps } = props;
  const defaultProps: Partial<ButtonProps> = {
    onClick
  };
  const mergedProps = Object.assign({}, defaultProps, otherProps);

  return <OutlineButton {...mergedProps}>{children}</OutlineButton>;
}

it('renders child text inside of button', async () => {
  renderWithTheme(<TestButton>Test button</TestButton>);
  expect(await screen.findByText('Test button')).toBeInTheDocument();
});

it('renders child nodes inside of button', async () => {
  renderWithTheme(
    <TestButton>
      <span>Hello</span>
    </TestButton>
  );

  const foundChild = await screen.findByText('Hello');
  expect(foundChild?.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', async () => {
  renderWithTheme(<TestButton>Test</TestButton>);
  await userEvent.click(await screen.findByText('Test'));
  expect(onClick).toHaveBeenCalled();
});
