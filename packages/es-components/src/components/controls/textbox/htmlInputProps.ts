import PropTypes from 'prop-types';

import { htmlProps } from '../../util/htmlProps';

type HTMLInputProps = JSXElementProps<'input'>;

type HTMLInputPropTypes = {
  [key in keyof HTMLInputProps]:
    | PropTypes.Requireable<HTMLInputProps[key]>
    | PropTypes.Validator<HTMLInputProps[key]>;
};

type NonNullableInputKeys = NonNullableKeys<HTMLInputProps>;

type HTMLInputDefaultProps = {
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
];

export const htmlInputPropTypes: HTMLInputPropTypes = {
  ...htmlProps,
  accept: PropTypes.string,
  alt: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  capture: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf<'user' | 'environment'>(['user', 'environment']).isRequired
  ]),
  checked: PropTypes.bool,
  crossOrigin: PropTypes.oneOf(['anonymous', 'use-credentials']),
  disabled: PropTypes.bool,
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
  formAction: PropTypes.string,
  formEncType: PropTypes.string,
  formMethod: PropTypes.string,
  formNoValidate: PropTypes.bool,
  formTarget: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  list: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  minLength: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.number,
  src: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(inputTypes),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
};

export const htmlInputDefaultProps: HTMLInputDefaultProps = {};
