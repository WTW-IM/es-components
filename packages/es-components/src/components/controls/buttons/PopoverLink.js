import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkButton from './LinkButton';
import { useTheme } from '../../util/useTheme';

const StyledButton = styled(LinkButton)`
  text-decoration: ${props =>
    props.suppressUnderline
      ? 'none'
      : `${props.variant.textColor} dashed underline`};

  &:hover,
  :focus {
    text-decoration: ${props =>
      props.suppressUnderline
        ? 'none'
        : `${props.variant.textColor} solid underline`};
  }
`;

const PopoverLink = React.forwardRef(function PopoverLink(props, ref) {
  const { children, styleType, suppressUnderline, ...other } = props;
  const theme = useTheme();
  const variant = theme.buttonStyles.linkButton.variant[styleType];

  return (
    <StyledButton
      ref={ref}
      variant={variant}
      suppressUnderline={suppressUnderline}
      {...other}
    >
      {children}
    </StyledButton>
  );
});

PopoverLink.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

PopoverLink.defaultProps = {
  styleType: 'primary',
  suppressUnderline: false
};

export default PopoverLink;
