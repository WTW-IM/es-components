import React from 'react';
import type * as CSS from 'csstype';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import OutlineButton from './OutlineButton';
import { useTheme } from '../../util/useTheme';
import genName from '../../util/generateAlphaName';
import {
  IconName,
  iconNames,
  ButtonVariantStyleType,
  buttonVariantStyleTypes
} from 'es-components-shared-types';
import { ButtonProps } from './Button';

interface ContainerProps {
  $maxWidth: CSS.Property.MaxWidth;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  max-width: ${props => props.$maxWidth};
  flex-direction: column;
  align-items: center;
`;

interface StyledIconButtonProps {
  $activeColor?: CSS.Property.BackgroundColor;
  $isHighlighted: Maybe<boolean>;
}

const StyledIconButton = styled(OutlineButton)<StyledIconButtonProps>`
  display: inline-block;
  width: auto;
  min-width: 0;
  padding: 13px 14px;
  border-width: 3px;
  border-radius: 50%;
  background-color: ${props => props.$isHighlighted && props.$activeColor};
  color: ${props => props.$isHighlighted && props.theme.colors.white};
  font-weight: normal;
  -webkit-tap-highlight-color: transparent;
`;

const IncompleteButton = styled(StyledIconButton)`
  border-left: 3px dashed ${props => props.theme.colors.gray5};
  background-color: ${props =>
    props.$isHighlighted ? props.theme.colors.gray5 : props.theme.colors.white};
  color: ${props =>
    props.$isHighlighted ? props.theme.colors.white : props.theme.colors.gray5};
  transform: rotate(45deg);

  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.gray6};
    color: ${props => props.theme.colors.white};
  }

  & i {
    transform: rotate(-45deg) translate(-1px, 1px);
  }
`;

interface IconTextProps {
  $fontSize: number;
  $maxWidth: CSS.Property.MaxWidth;
  $isHighlighted?: boolean;
}

const IconText = styled.span<IconTextProps>`
  overflow: hidden;
  max-width: ${props => props.$maxWidth};
  margin-top: 6px;
  font-size: ${props => props.$fontSize}px;
  font-weight: ${props => (props.$isHighlighted ? 'bold' : 'normal')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export type IconButtonProps = Override<
  JSXElementProps<'div'>,
  {
    iconName: IconName;
    iconSize?: number;
    childrenFontSize?: number;
    isHighlighted?: boolean;
    isIncomplete?: boolean;
    disabled?: ButtonProps['disabled'];
    maxWidth?: CSS.Property.MaxWidth;
    onClick?: ButtonProps['onClick'];
    styleType?: ButtonProps['styleType'];
  }
>;

const noop = () => {
  // noop
};

const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(
  function IconButton(
    {
      iconName,
      iconSize = 45,
      childrenFontSize = 18,
      isHighlighted = false,
      isIncomplete = false,
      disabled = false,
      maxWidth = 'auto',
      onClick = noop,
      styleType = 'magenta',
      children,
      ...otherProps
    },
    ref
  ) {
    const CurrentButton = isIncomplete ? IncompleteButton : StyledIconButton;
    const theme = useTheme();
    const textId = genName();
    const buttonStyle = theme?.buttonStyles.outlineButton.variant[styleType];

    return (
      <Container ref={ref} $maxWidth={maxWidth} {...otherProps}>
        <CurrentButton
          onClick={onClick}
          styleType={styleType}
          $isHighlighted={isHighlighted}
          disabled={disabled}
          $activeColor={buttonStyle?.bgColor}
          aria-pressed={isHighlighted}
          aria-labelledby={textId}
        >
          <Icon name={iconName} size={iconSize} />
        </CurrentButton>
        <IconText
          id={textId}
          $isHighlighted={isHighlighted}
          $maxWidth={maxWidth}
          $fontSize={childrenFontSize}
        >
          {children}
        </IconText>
      </Container>
    );
  }
);

IconButton.propTypes = {
  ...Container.propTypes,
  /** Used to specify the icon used within the button */
  iconName: PropTypes.oneOf<IconName>(iconNames).isRequired,
  /** The font size of the inner icon */
  iconSize: PropTypes.number,
  /** The font size of the text displayed below the icon */
  childrenFontSize: PropTypes.number,
  /** Determines whether the icon is shown with a solid background by default */
  isHighlighted: PropTypes.bool,
  /** Displays the icon with a style representing an incomplete state */
  isIncomplete: PropTypes.bool,
  /** Disables the click event on the button */
  disabled: PropTypes.bool,
  /** Sets the max width for the button, affects text ellipsis */
  maxWidth: PropTypes.string,
  /** Onclick function used by the button */
  onClick: PropTypes.func,
  /** OutlineButton styleType (from theme) used for the icon */
  styleType: PropTypes.oneOf<ButtonVariantStyleType>(buttonVariantStyleTypes),
  /** Content to be displayed below the icon */
  children: PropTypes.node
};

export default IconButton;
