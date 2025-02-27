import React from 'react';
import PropTypes from 'prop-types';
import * as CSS from 'csstype';
import styled, { css } from 'styled-components';

import { darken, getTextColor } from '../../util/colors';
import useUniqueId from '../../util/useUniqueId';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';
import { htmlInputPropTypes, HTMLInputProps } from '../../util/htmlProps';
import {
  BGColorButtonVariant,
  ButtonSize,
  ButtonSizeBlock,
  ButtonVariantStyleType,
  buttonSizes,
  buttonVariantStyleTypes
} from 'es-components-shared-types';
import { useRadioGroupContext } from '../radio-buttons/RadioGroupContext';
import { getCheckedProps } from '../radio-buttons/RadioButton';

export interface AnswerButtonVariant extends BGColorButtonVariant {
  borderColor?: CSS.Property.BorderColor;
}

export type AnswerButtonProps = Override<
  HTMLInputProps,
  {
    itemWidth?: CSS.Property.Width;
    styleType?: ButtonVariantStyleType;
    selectedType?: ButtonVariantStyleType;
    size?: ButtonSize;
    isOutline?: boolean;
  }
>;

interface AnswerLabelProps {
  $itemWidth: AnswerButtonProps['itemWidth'];
}
const AnswerLabel = styled.label.withConfig({
  shouldForwardProp: prop => !['validationState'].includes(prop)
})<AnswerLabelProps>`
  ${({ $itemWidth, theme }) => css`
    flex-grow: 1;

    @media (min-width: ${theme.screenSize.tablet}) {
      min-width: ${$itemWidth};
      flex-grow: 0;
    }
  `}
`;

interface AnswerDisplayProps {
  $buttonStyle: AnswerButtonVariant;
  $buttonSize: ButtonSizeBlock;
}
const AnswerDisplay = styled.div<AnswerDisplayProps>`
  padding: ${props => props.$buttonSize.paddingTop}
    ${props => props.$buttonSize.paddingSides}
    ${props => props.$buttonSize.paddingBottom}
    ${props => props.$buttonSize.paddingSides};
  border-color: transparent;
  margin-top: 0;
  margin-bottom: 4px;
  background-color: ${props => props.$buttonStyle.bgColor};
  box-shadow: 0 4px 0 0 ${props => darken(props.$buttonStyle.bgColor, 10)};
  color: ${props => getTextColor(props.$buttonStyle.bgColor)};
  font-size: ${props => props.$buttonSize.fontSize};
  font-weight: ${props => props.$buttonSize.fontWeight || 'normal'};
  line-height: ${props => props.$buttonSize.lineHeight};
  text-align: center;
  text-transform: ${props =>
    props.$buttonSize.textTransform ? props.$buttonSize.textTransform : 'none'};
  transition:
    background-color 250ms linear,
    color 250ms linear;
  user-select: none;

  &:active {
    margin-top: 4px;
    margin-bottom: 0;
    background-color: ${props => darken(props.$buttonStyle.bgColor, 8)};
    box-shadow: 0 0 0 0 transparent;
    color: ${props => getTextColor(props.$buttonStyle.bgColor)};
  }

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => darken(props.$buttonStyle.bgColor, 8)};
      color: ${props => getTextColor(props.$buttonStyle.bgColor)};
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }
`;

interface OutlineAnswerDisplayProps {
  $isChecked?: boolean;
}

const OutlineAnswerDisplay = styled(AnswerDisplay)<OutlineAnswerDisplayProps>`
  box-sizing: border-box;
  border: 2px solid
    ${props => props.$buttonStyle.borderColor || props.$buttonStyle.bgColor};
  margin: 0;
  background-color: ${props =>
    props.$isChecked ? props.$buttonStyle.bgColor : props.theme.colors.white};
  box-shadow: none;
  color: ${props =>
    props.$isChecked ? props.theme.colors.white : props.$buttonStyle.bgColor};

  &:active {
    margin: 0;
  }
`;

// this preserves css syntax highlighting
const ModifiedAnswerInput = styled('input').withConfig({
  shouldForwardProp: prop =>
    ![
      'size',
      'styleType',
      'selectedType',
      'isOutline',
      'itemWidth',
      'isAnswerGroup',
      'selectedValue',
      'disableAllOptions'
    ].includes(prop)
})``;

type AnswerInputProps = {
  $buttonStyle: AnswerButtonVariant;
};

const AnswerInput = styled(ModifiedAnswerInput)<AnswerInputProps>`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(100%);
  white-space: nowrap;

  &:focus + div {
    background-color: ${props => darken(props.$buttonStyle.bgColor, 8)};
    color: ${props => getTextColor(props.$buttonStyle.bgColor)};
  }
`;

const AnswerButton = React.forwardRef<HTMLInputElement, AnswerButtonProps>(
  function AnswerButton(
    {
      children,
      itemWidth: itemWidthProp,
      styleType: styleTypeProp,
      selectedType: selectedTypeProp,
      size: sizeProp,
      isOutline: isOutlineProp,
      ...radioProps
    },
    ref
  ) {
    const { size: contextPropsSize, ...contextProps } =
      useRadioGroupContext<true>();
    const { disableAllOptions } = contextProps;
    const checkedProps = getCheckedProps(radioProps, contextProps);
    const id = useUniqueId(radioProps.id);
    const isChecked = checkedProps.checked || checkedProps.defaultChecked;
    const disabled = radioProps.disabled || disableAllOptions;
    const theme = useTheme();
    const validationState = React.useContext(ValidationContext);
    const isOutline =
      isOutlineProp !== undefined ? isOutlineProp : contextProps.isOutline;
    const size = sizeProp || contextPropsSize || 'default';
    const styleType = styleTypeProp || contextProps.styleType || 'default';
    const selectedType =
      selectedTypeProp || contextProps.selectedType || 'default';
    const itemWidth = itemWidthProp || contextProps.itemWidth;

    const buttonType = isOutline ? 'outlineButton' : 'button';
    const buttonSize: ButtonSizeBlock = theme?.buttonStyles[buttonType].size[
      size
    ] ?? {
      fontSize: '',
      fontWeight: '',
      lineHeight: '',
      paddingTop: '',
      paddingSides: '',
      paddingBottom: '',
      borderRadius: ''
    };

    const variant =
      validationState !== 'default' && !isOutline
        ? (validationState as ButtonVariantStyleType)
        : styleType;
    const validationBorder =
      theme?.buttonStyles[buttonType].variant[
        validationState as ButtonVariantStyleType
      ].bgColor;

    let selectedStyles: AnswerButtonVariant = theme?.buttonStyles[buttonType]
      .variant[selectedType] ?? { bgColor: '' };
    let unSelectedStyles: AnswerButtonVariant = theme?.buttonStyles[buttonType]
      .variant[variant] ?? { bgColor: '' };

    if (isOutline && validationState !== 'default') {
      selectedStyles = { ...selectedStyles, borderColor: validationBorder };
      unSelectedStyles = { ...unSelectedStyles, borderColor: validationBorder };
    }

    const buttonStyle = isChecked ? selectedStyles : unSelectedStyles;

    const buttonProps = {
      disabled,
      $isChecked: isChecked,
      $buttonStyle: buttonStyle,
      $buttonSize: buttonSize
    };

    const labelProps = {
      disabled: radioProps.disabled,
      $itemWidth: itemWidth,
      htmlFor: id,
      validationState
    };

    const inputProps = {
      ...contextProps,
      ...radioProps,
      ...checkedProps,
      disabled
    };

    const Display = isOutline ? OutlineAnswerDisplay : AnswerDisplay;

    return (
      <AnswerLabel {...labelProps}>
        <AnswerInput
          type="radio"
          id={id}
          $buttonStyle={buttonStyle}
          ref={ref}
          {...inputProps}
        />
        <Display {...buttonProps}>{children}</Display>
      </AnswerLabel>
    );
  }
);

export const propTypes = {
  ...htmlInputPropTypes,
  itemWidth: PropTypes.string,
  styleType: PropTypes.oneOf<ButtonVariantStyleType>(buttonVariantStyleTypes),
  selectedType: PropTypes.oneOf<ButtonVariantStyleType>(
    buttonVariantStyleTypes
  ),
  size: PropTypes.oneOf<ButtonSize>(buttonSizes),
  isOutline: PropTypes.bool
};

AnswerButton.propTypes = propTypes;

export default AnswerButton;
