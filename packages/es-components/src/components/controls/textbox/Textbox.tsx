import React, { useCallback, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { IconName, iconNames } from 'es-components-shared-types';
import getStyledProp, { ESThemeProps } from '../../util/getStyledProp';
import { HiddenIcons, useIconStyles } from '../../base/icons/useIconStyles';
import InputBase, {
  useValidationStyleProps,
  validationStateHighlightStyles,
  validationStateInputStyles,
  validationStateSetupStyles,
  noInset,
  basicTextboxStyles,
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps,
  ValidationStyleProps
} from './InputBase';
import { callRefs } from '../../util/callRef';

export type TextboxAdditionProps = {
  $hasPrepend?: boolean;
  $hasAppend?: boolean;
};

type IconStyles = ReturnType<typeof useIconStyles>;

export type InputWrapperProps = Override<
  ValidationStyleProps,
  Override<
    TextboxAdditionProps,
    {
      $prependIconStyles?: IconStyles;
      $appendIconStyles?: IconStyles;
    }
  >
>;

function shouldForwardValidationProp(prop: string) {
  return ![
    'borderColor',
    'focusBorderColor',
    'focusBoxShadow',
    'backgroundColor',
    'boxShadow',
    'disabledBackgroundColor',
    'backgroundColorFlat',
    'focusBoxShadowFlat',
    'addOn',
    'flat'
  ].includes(prop);
}

const InputWrapper = styled.div.withConfig({
  shouldForwardProp: shouldForwardValidationProp
})<InputWrapperProps>`
  ${validationStateSetupStyles}
  ${validationStateInputStyles}

  &:focus-within {
    ${validationStateHighlightStyles}
  }

  ${({ $prependIconStyles, $appendIconStyles }) => css`
    display: flex;
    padding: 0 !important;

    &&::before {
      ${$prependIconStyles}
    }

    &&::after {
      ${$appendIconStyles}
    }
  `}

    ${props => css`
  &&::before,
  &&::after {
      background-color: ${getStyledProp('backgroundColor', 'addOn', props)};
      color: ${getStyledProp('textColor', 'addOn', props)};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1;
    margin: 0;
    outline: 0;
    padding: 0.333em 0.6111em;
    `}
  }
`;

export const TextboxBase = styled(InputBase)<TextboxAdditionProps>`
  ${basicTextboxStyles}
  width: 100%;

  && {
    height: ${props =>
      getStyledProp('inputStyles.inputHeight', props as ESThemeProps) ||
      '2.2em'};
    border: none !important;
    margin: 0 !important;

    &:not([disabled], [readonly]) {
      background-color: transparent !important;
      box-shadow: none !important;
    }
  }

  ${({ $hasPrepend }) =>
    $hasPrepend &&
    css`
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    `}

  ${({ $hasAppend }) =>
    $hasAppend &&
    css`
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    `}

  &&:focus {
    box-shadow: ${noInset};
  }
`;

export interface TextboxProps extends JSXElementProps<'input'> {
  flat?: boolean;
  prependIconName?: IconName;
  appendIconName?: IconName;
}

const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(
  function ForwardedTextbox(props, ref) {
    const {
      prependIconName,
      appendIconName,
      type = 'text',
      flat,
      className,
      style,
      ...additionalTextProps
    } = props;
    const validationProps = useValidationStyleProps({ flat });

    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    const [prependIcon, setPrependIcon] = useState<Maybe<HTMLElement>>();
    const [appendIcon, setAppendIcon] = useState<Maybe<HTMLElement>>();
    const prependIconStyles = useIconStyles(prependIconName, prependIcon);
    const appendIconStyles = useIconStyles(appendIconName, appendIcon);

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef,
      [inputRef]
    );

    const setRefs = useCallback<React.RefCallback<HTMLInputElement>>(
      instance => {
        callRefs(instance, setInputRef, ref);
      },
      [ref]
    );

    const hasPrepend = !!prependIconName;
    const hasAppend = !!appendIconName;
    const prependProps = { $hasPrepend: hasPrepend, $hasAppend: hasAppend };
    const sharedProps = { ...validationProps, ...prependProps };

    const focusInput = useCallback(() => inputRef?.focus(), [inputRef]);

    return (
      <InputWrapper
        className={className}
        as="div"
        onClick={focusInput}
        style={style}
        {...{
          ...sharedProps,
          $prependIconStyles: prependIconStyles,
          $appendIconStyles: appendIconStyles
        }}
      >
        {hasPrepend || hasAppend ? (
          <HiddenIcons
            icons={{
              ...(hasPrepend ? { [prependIconName]: setPrependIcon } : {}),
              ...(hasAppend ? { [appendIconName]: setAppendIcon } : {})
            }}
            iconProps={{ size: 18 }}
          />
        ) : (
          <></>
        )}
        <TextboxBase
          ref={setRefs}
          type={type}
          className={className}
          {...additionalTextProps}
          {...sharedProps}
        />
      </InputWrapper>
    );
  }
);

const inputTypes = [
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

type InputTypeAttribute = JSXElementProps<'input'>['type'];

export const propTypes = {
  ...basePropTypes,
  /** Content to prepend input box with */
  prependIconName: PropTypes.oneOf<IconName>(iconNames),
  /** Content to append to input box */
  appendIconName: PropTypes.oneOf<IconName>(iconNames),
  /** The type attribute for the textbox input */
  type: PropTypes.oneOf<InputTypeAttribute>(inputTypes),
  /** Whether the textbox is the flat style or not */
  flat: PropTypes.bool
};

export const defaultProps = {
  ...baseDefaultProps,
  prependIconName: undefined,
  appendIconName: undefined,
  type: 'text',
  flat: undefined
};

Textbox.propTypes = propTypes;
Textbox.defaultProps = defaultProps;

export default Textbox;
