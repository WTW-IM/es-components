import React from 'react';
import PropTypes from 'prop-types';
import * as CSS from 'csstype';
import styled from 'styled-components';

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

const AnswerLabel = styled.label<{ itemWidth: AnswerButtonProps['itemWidth'] }>`
  flex-grow: 1;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    flex-grow: 0;
    min-width: ${props => props.itemWidth};
  }
`;

const AnswerDisplay = styled.div<{
  buttonStyle: AnswerButtonVariant;
  buttonSize: ButtonSizeBlock;
}>`
  background-color: ${props => props.buttonStyle.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => darken(props.buttonStyle.bgColor, 10)};
  color: ${props => getTextColor(props.buttonStyle.bgColor)};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  font-size: ${props => props.buttonSize.fontSize};
  line-height: ${props => props.buttonSize.lineHeight};
  margin-bottom: 4px;
  margin-top: 0;
  padding-top: ${props => props.buttonSize.paddingTop};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  text-align: center;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: background-color 250ms linear, color 250ms linear;
  user-select: none;

  &:active {
    background-color: ${props => darken(props.buttonStyle.bgColor, 8)};
    box-shadow: 0 0 0 0 transparent;
    color: ${props => getTextColor(props.buttonStyle.bgColor)};
    margin-bottom: 0;
    margin-top: 4px;
  }

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => darken(props.buttonStyle.bgColor, 8)};
      color: ${props => getTextColor(props.buttonStyle.bgColor)};
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

const OutlineAnswerDisplay = styled(AnswerDisplay)<{ isChecked?: boolean }>`
  background-color: ${props =>
    props.isChecked ? props.buttonStyle.bgColor : props.theme.colors.white};
  border: 2px solid
    ${props => props.buttonStyle.borderColor || props.buttonStyle.bgColor};
  box-shadow: none;
  box-sizing: border-box;
  color: ${props =>
    props.isChecked ? props.theme.colors.white : props.buttonStyle.bgColor};
  margin: 0;

  &:active {
    margin: 0;
  }
`;

// this preserves css syntax highlighting
const ModifiedAnswerInput = styled('input').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['buttonStyle', 'size'].includes(prop) && defaultValidatorFn(prop)
})``;

const AnswerInput = styled(ModifiedAnswerInput)<{
  buttonStyle: AnswerButtonVariant;
}>`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:focus + div {
    background-color: ${props => darken(props.buttonStyle.bgColor, 8)};
    color: ${props => getTextColor(props.buttonStyle.bgColor)};
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
    const buttonSize = theme.buttonStyles[buttonType].size[size];

    const variant =
      validationState !== 'default' && !isOutline
        ? (validationState as ButtonVariantStyleType)
        : styleType;
    const validationBorder =
      theme.buttonStyles[buttonType].variant[
        validationState as ButtonVariantStyleType
      ].bgColor;

    let selectedStyles: AnswerButtonVariant =
      theme.buttonStyles[buttonType].variant[selectedType];
    let unSelectedStyles: AnswerButtonVariant =
      theme.buttonStyles[buttonType].variant[variant];

    if (isOutline && validationState !== 'default') {
      selectedStyles = { ...selectedStyles, borderColor: validationBorder };
      unSelectedStyles = { ...unSelectedStyles, borderColor: validationBorder };
    }

    const buttonStyle = isChecked ? selectedStyles : unSelectedStyles;

    const buttonProps = {
      disabled,
      isChecked,
      buttonStyle,
      buttonSize
    };

    const labelProps = {
      disabled: radioProps.disabled,
      itemWidth,
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
          buttonStyle={buttonStyle}
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
