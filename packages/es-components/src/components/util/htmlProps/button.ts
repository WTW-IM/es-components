import PropTypes from 'prop-types';
import { htmlProps } from './html';
import { baseFormElementProps } from './form';

export type HTMLButtonProps = JSXElementProps<'button'>;

export type HTMLButtonPropTypes = PropTypesOf<HTMLButtonProps>;

type NonNullableButtonKeys = NonNullableKeys<HTMLButtonProps>;

export type HTMLInputButtonProps = {
  [key in NonNullableButtonKeys]?: HTMLButtonProps[key];
};

export const buttonTypes = ['button', 'submit', 'reset'] as const;

export type ButtonType = (typeof buttonTypes)[number];

export const htmlButtonPropTypes: HTMLButtonPropTypes = {
  ...htmlProps,
  ...baseFormElementProps,
  type: PropTypes.oneOf<ButtonType>(buttonTypes)
};

export const htmlButtonDefaultProps: HTMLInputButtonProps = {};
