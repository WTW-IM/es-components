import React from 'react';
import { screen } from '@testing-library/react';
import LinkButton, { LinkButtonProps } from './LinkButton';
import { renderWithTheme } from '../../util/test-utils';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();

function TestButton(props: Partial<LinkButtonProps>) {
  const { children = '', ...otherProps } = props;
  const defaultProps = {
    onClick
  };
  const mergedProps = Object.assign({}, defaultProps, otherProps);

  return <LinkButton {...mergedProps}>{children}</LinkButton>;
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
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', async () => {
  renderWithTheme(TestButton({ children: 'Test' }));

  await userEvent.click(await screen.findByText('Test'));

  expect(onClick).toHaveBeenCalled();
});
