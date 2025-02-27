import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import Button, { propTypes as buttonPropTypes, ButtonProps } from './Button';
import type { ButtonVariant } from 'es-components-shared-types';

interface StyledActionButtonProps {
  $defaultStyle?: ButtonVariant;
  $hoverStyle?: ButtonVariant;
}

const StyledButton = styled(Button)<StyledActionButtonProps>`
  border-color: ${props => props.$defaultStyle?.bgColor};
  background-color: ${props => props.$defaultStyle?.bgColor};
  color: ${props => props.theme.colors.black};

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      border-color: ${props => props.$hoverStyle?.bgColor};
      background-color: ${props => props.$hoverStyle?.bgColor};
    }
  }
`;

const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function ActionButton(props, ref) {
    const { children, styleType = 'default', ...other } = props;
    const theme = useTheme();
    const defaultStyle = theme?.buttonStyles.button.variant.default;
    const hoverStyle = theme?.buttonStyles.button.variant[styleType];

    return (
      <StyledButton
        ref={ref}
        $defaultStyle={defaultStyle}
        $hoverStyle={hoverStyle}
        styleType={styleType}
        type="button"
        {...other}
      >
        {children}
      </StyledButton>
    );
  }
);

export const propTypes = {
  ...buttonPropTypes,
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.button */
  styleType: buttonPropTypes.styleType
};

ActionButton.propTypes = propTypes;

export default ActionButton;
