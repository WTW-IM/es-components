import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import Button from './Button';

const StyledButton = styled(Button)`
  .es-button__display {
    background-color: ${props => props.defaultStyle.bgColor};
    box-shadow: 0 4px 0 0 ${props => props.defaultStyle.boxShadowColor};
    color: ${props => props.defaultStyle.textColor};
    transition: background-color 120ms linear, color 120ms linear;
  }

  &:hover .es-button__display {
    background-color: ${props => props.hoverStyle.bgColor};
    box-shadow: 0 4px 0 0 ${props => props.hoverStyle.hoverBgColor};
    color: ${props => props.hoverStyle.textColor};
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

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.button */
  styleType: PropTypes.string
};

ActionButton.defaultProps = {
  styleType: 'primary'
};

export default ActionButton;
