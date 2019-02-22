import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: ${props => props.variant.bgColor};
  font-size: inherit;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  padding: 0;
  text-decoration: underline;

  &:hover,
  &:focus,
  &:active {
    color: ${props => props.variant.hoverBgColor};
    text-decoration: none;
  }

  &:active {
    box-shadow: none;
  }

  &[disabled]:hover {
    color: ${props => props.variant.bgColor};
    text-decoration: underline;
  }
`;

function LinkButton(props) {
  const { children, styleType, innerRef, ...other } = props;
  const theme = useTheme();
  const variant = theme.buttonStyles.button.variant[styleType];

  return (
    <StyledButton ref={innerRef} variant={variant} type="button" {...other}>
      {children}
    </StyledButton>
  );
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string
};

LinkButton.defaultProps = {
  styleType: 'default'
};

export default React.forwardRef((props, ref) => (
  <LinkButton innerRef={ref} {...props} />
));
