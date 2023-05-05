import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import Button, {
  propTypes as buttonPropTypes,
  defaultProps as buttonDefaultProps
} from './Button';

const StyledButton = styled(Button)`
  background-color: ${props => props.defaultStyle.bgColor};
  border-color: ${props => props.defaultStyle.bgColor};
  color: ${props => props.theme.colors.black};

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => props.hoverStyle.bgColor};
      border-color: ${props => props.hoverStyle.bgColor};
    }
  }
`;

const ActionButton = React.forwardRef(function ActionButton(props, ref) {
  const { children, styleType, ...other } = props;
  const theme = useTheme();
  const defaultStyle = theme.buttonStyles.button.variant.default;
  const hoverStyle = theme.buttonStyles.button.variant[styleType];

  return (
    <StyledButton
      ref={ref}
      defaultStyle={defaultStyle}
      hoverStyle={hoverStyle}
      styleType={styleType}
      type="button"
      {...other}
    >
      {children}
    </StyledButton>
  );
});

export const propTypes = {
  ...buttonPropTypes,
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.button */
  styleType: PropTypes.string
};

export const defaultProps = {
  ...buttonDefaultProps,
  styleType: 'primary'
};

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

export default ActionButton;
