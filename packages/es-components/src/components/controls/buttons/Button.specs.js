/* eslint-env jest */
/* eslint react/prop-types: 0 */
import React from 'react';

import Button from './Button';
import { renderWithTheme } from '../../util/test-utils';

const onClick = jest.fn();

function buildButton(props) {
  const { children, ...otherProps } = props;
  const defaultProps = {
    onClick
  };
  const mergedProps = Object.assign({}, defaultProps, otherProps);

  return <Button {...mergedProps}>{children}</Button>;
}

it('renders child text inside of button', () => {
  const { queryByText } = renderWithTheme(
    buildButton({ children: 'Test button' })
  );
  const button = queryByText('Test button');
  expect(button).not.toBeNull();
});

it('renders child nodes inside of button', () => {
  const child = <span>Hello</span>;

  const { getByText } = renderWithTheme(buildButton({ children: child }));

  const foundChild = getByText('Hello');
  expect(foundChild.nodeName).toBe('SPAN');
});

it('executes the onClick function passed', () => {
  const { getByText } = renderWithTheme(buildButton({ children: 'Test' }));

  getByText('Test').click();

  expect(onClick).toHaveBeenCalled();
});

it('can show loading-state content instead of child while onClick is in-flight', async () => {
  const { getByText, findByText } = renderWithTheme(
    buildButton({
      children: 'Test',
      showWhileRunning: 'Running...',
      onClick: () => Promise.resolve()
    })
  );

  getByText('Test').click();
  getByText('Running...');
  await findByText('Test');

  expect(onClick).toHaveBeenCalled();
});
