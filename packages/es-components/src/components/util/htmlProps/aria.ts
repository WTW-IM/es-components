import PropTypes from 'prop-types';
import { AriaAttributes, AriaRole } from 'react';

type AriaPropTypes = PropTypesOf<AriaAttributes>;

type NonNullableAriaKeys = NonNullableKeys<AriaAttributes>;

type AriaDefaultProps = {
  [key in NonNullableAriaKeys]?: AriaAttributes[key];
};

export const booleanStrings: BooleanString[] = ['true', 'false'];

export const ariaProps: AriaPropTypes = {
  'aria-activedescendant': PropTypes.string,
  'aria-atomic': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-autocomplete': PropTypes.oneOf<'none' | 'inline' | 'list' | 'both'>([
    'none',
    'inline',
    'list',
    'both'
  ]),

  'aria-braillelabel': PropTypes.string,
  'aria-brailleroledescription': PropTypes.string,
  'aria-busy': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-checked': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString | 'mixed'>([...booleanStrings, 'mixed'])
  ]),
  'aria-colcount': PropTypes.number,
  'aria-colindex': PropTypes.number,
  'aria-colindextext': PropTypes.string,
  'aria-colspan': PropTypes.number,
  'aria-controls': PropTypes.string,

  'aria-current': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<
      'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time'
    >([...booleanStrings, 'page', 'step', 'location', 'date', 'time'])
  ]),
  'aria-describedby': PropTypes.string,
  'aria-description': PropTypes.string,
  'aria-details': PropTypes.string,
  'aria-disabled': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-dropeffect': PropTypes.oneOf<
    'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
  >(['none', 'copy', 'execute', 'link', 'move', 'popup']),
  'aria-errormessage': PropTypes.string,

  'aria-expanded': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-flowto': PropTypes.string,
  'aria-grabbed': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),

  'aria-haspopup': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<
      'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    >([...booleanStrings, 'menu', 'listbox', 'tree', 'grid', 'dialog'])
  ]),
  'aria-hidden': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-invalid': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString | 'grammar' | 'spelling'>([
      ...booleanStrings,
      'grammar',
      'spelling'
    ])
  ]),

  'aria-keyshortcuts': PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,

  'aria-level': PropTypes.number,

  'aria-live': PropTypes.oneOf<'off' | 'assertive' | 'polite'>([
    'off',
    'assertive',
    'polite'
  ]),

  'aria-modal': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),

  'aria-multiline': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),

  'aria-multiselectable': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),

  'aria-orientation': PropTypes.oneOf<'horizontal' | 'vertical'>([
    'horizontal',
    'vertical'
  ]),
  'aria-owns': PropTypes.string,
  'aria-placeholder': PropTypes.string,
  'aria-posinset': PropTypes.number,
  'aria-pressed': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString | 'mixed'>([...booleanStrings, 'mixed'])
  ]),
  'aria-readonly': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-relevant': PropTypes.oneOf<
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals'
  >([
    'additions',
    'additions removals',
    'additions text',
    'all',
    'removals',
    'removals additions',
    'removals text',
    'text',
    'text additions',
    'text removals'
  ]),

  'aria-required': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),

  'aria-roledescription': PropTypes.string,
  'aria-rowcount': PropTypes.number,
  'aria-rowindex': PropTypes.number,
  'aria-rowindextext': PropTypes.string,
  'aria-rowspan': PropTypes.number,
  'aria-selected': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<BooleanString>(booleanStrings)
  ]),
  'aria-setsize': PropTypes.number,

  'aria-sort': PropTypes.oneOf<'none' | 'ascending' | 'descending' | 'other'>([
    'none',
    'ascending',
    'descending',
    'other'
  ]),

  'aria-valuemax': PropTypes.number,

  'aria-valuemin': PropTypes.number,
  'aria-valuenow': PropTypes.number,

  'aria-valuetext': PropTypes.string
};

export const ariaRoles: AriaRole[] = [
  'alert',
  'alertdialog',
  'application',
  'article',
  'banner',
  'button',
  'cell',
  'checkbox',
  'columnheader',
  'combobox',
  'complementary',
  'contentinfo',
  'definition',
  'dialog',
  'directory',
  'document',
  'feed',
  'figure',
  'form',
  'grid',
  'gridcell',
  'group',
  'heading',
  'img',
  'link',
  'list',
  'listbox',
  'listitem',
  'log',
  'main',
  'marquee',
  'math',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'navigation',
  'none',
  'note',
  'option',
  'presentation',
  'progressbar',
  'radio',
  'radiogroup',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'scrollbar',
  'search',
  'searchbox',
  'separator',
  'slider',
  'spinbutton',
  'status',
  'switch',
  'tab',
  'table',
  'tablist',
  'tabpanel',
  'term',
  'textbox',
  'timer',
  'toolbar',
  'tooltip',
  'tree',
  'treegrid',
  'treeitem'
];

export const ariaDefaultProps: AriaDefaultProps = {};
