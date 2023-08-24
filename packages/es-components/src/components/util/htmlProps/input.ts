import PropTypes from 'prop-types';
import { htmlProps } from './html';
import { baseFormElementProps } from './form';

export type HTMLInputProps = JSXElementProps<'input'>;

export type HTMLInputPropTypes = {
  [key in keyof HTMLInputProps]:
    | PropTypes.Requireable<HTMLInputProps[key]>
    | PropTypes.Validator<HTMLInputProps[key]>;
};

type NonNullableInputKeys = NonNullableKeys<HTMLInputProps>;

export type HTMLInputDefaultProps = {
  [key in NonNullableInputKeys]?: HTMLInputProps[key];
};

export const inputTypes = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week'
] as const;

export const htmlInputPropTypes: HTMLInputPropTypes = {
  ...htmlProps,
  ...baseFormElementProps,
  accept: PropTypes.string,
  alt: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  capture: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf<'user' | 'environment'>(['user', 'environment']).isRequired
  ]),
  checked: PropTypes.bool,
  form: PropTypes.string,
  enterKeyHint: PropTypes.oneOf([
    'enter',
    'done',
    'go',
    'next',
    'previous',
    'search',
    'send'
  ]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  list: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  minLength: PropTypes.number,
  multiple: PropTypes.bool,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.number,
  src: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(inputTypes),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
};

export const htmlInputDefaultProps: HTMLInputDefaultProps = {};
