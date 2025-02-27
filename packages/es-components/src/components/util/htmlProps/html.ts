import PropTypes from 'prop-types';
import { AriaRole } from 'react';
import { domProps, domDefaultProps } from './dom';
import { booleanStrings, ariaRoles, ariaProps, ariaDefaultProps } from './aria';
import { CSSObject, Interpolation } from 'styled-components';

export type BasicHTMLProps = JSXElementProps<'basicHTMLElement'>;

export type HTMLPropTypes = PropTypesOf<BasicHTMLProps>;

type NonNullableHTMLKeys = NonNullableKeys<BasicHTMLProps>;

export type HTMLDefaultProps = {
  [key in NonNullableHTMLKeys]?: BasicHTMLProps[key];
};

export type InputMode =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';

export const inputModes: InputMode[] = [
  'none',
  'text',
  'tel',
  'url',
  'email',
  'numeric',
  'decimal',
  'search'
];

declare module 'react' {
  interface Attributes {
    css?: Interpolation<object>;
  }
}

export const htmlProps: HTMLPropTypes = {
  ...domProps,
  ...ariaProps,
  // React-specific Attributes
  defaultChecked: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  suppressContentEditableWarning: PropTypes.bool,
  suppressHydrationWarning: PropTypes.bool,

  // Standard HTML Attributes
  accessKey: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  contentEditable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString | 'inherit'>([...booleanStrings, 'inherit'])
  ]),
  enterKeyHint: PropTypes.oneOf<
    'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
  >(['enter', 'done', 'go', 'next', 'previous', 'search', 'send']),
  contextMenu: PropTypes.string,
  dir: PropTypes.string,
  draggable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  hidden: PropTypes.bool,
  id: PropTypes.string,
  lang: PropTypes.string,
  nonce: PropTypes.string,
  slot: PropTypes.string,
  spellCheck: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  translate: PropTypes.oneOf<'yes' | 'no'>(['yes', 'no']),

  // Unknown
  radioGroup: PropTypes.string, // <command>, <menuitem>

  // WAI-ARIA
  role: PropTypes.oneOf<AriaRole>(ariaRoles),

  // RDFa Attributes
  about: PropTypes.string,
  content: PropTypes.string,
  datatype: PropTypes.string,
  inlist: PropTypes.any,
  prefix: PropTypes.string,
  property: PropTypes.string,
  rel: PropTypes.string,
  resource: PropTypes.string,
  rev: PropTypes.string,
  typeof: PropTypes.string,
  vocab: PropTypes.string,

  // Non-standard Attributes
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.string,
  autoSave: PropTypes.string,
  color: PropTypes.string,
  itemProp: PropTypes.string,
  itemScope: PropTypes.bool,
  itemType: PropTypes.string,
  itemID: PropTypes.string,
  itemRef: PropTypes.string,
  results: PropTypes.number,
  security: PropTypes.string,
  unselectable: PropTypes.oneOf<'on' | 'off'>(['on', 'off']),
  inputMode: PropTypes.oneOf<InputMode>(inputModes),
  is: PropTypes.string,

  // styled-components css prop
  css: PropTypes.oneOfType([
    PropTypes.objectOf<CSSObject | string | number | undefined>(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape<PropTypes.ValidationMap<CSSObject>>({})
      ]).isRequired
    ),
    PropTypes.string
  ])
};

export const htmlDefaultProps: HTMLDefaultProps = {
  ...domDefaultProps,
  ...ariaDefaultProps
};
