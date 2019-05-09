import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';

const StyledButton = styled.button`
  background-color: ${props => props.variant.bgColor};
  border: 2px solid ${props => props.variant.borderColor};
  border-radius: ${props => props.buttonSize.borderRadius};
  box-sizing: border-box;
  color: ${props => props.variant.textColor};
  cursor: pointer;
  display: block;
  font-family: inherit;
  font-size: ${props => props.buttonSize.fontSize};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  line-height: ${props =>
    props.buttonSize.lineHeight || props.theme.sizes.baseLineHeight};
  min-width: ${props => (props.hasMinWidth ? '100px' : '0')};
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-top: ${props => props.buttonSize.paddingTop};
  text-align: center;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: background-color 250ms linear, color 250ms linear;
  white-space: nowrap;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: ${props => (props.block ? 'block' : 'inline-block')};
    width: ${props => (props.block ? '100%' : 'auto')};
  }

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
    color: ${props => props.variant.hoverTextColor};
  }

  &:active {
    background-color: ${props => props.variant.activeBgColor};
    color: ${props => props.variant.activeTextColor};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }

  &[disabled]:hover {
    color: ${props => props.variant.textColor};
    background-color: ${props => props.variant.bgColor};
  }
`;

const OutlineButton = React.forwardRef(function OutlineButton(props, ref) {
  const { children, styleType, size, block, hasMinWidth, ...other } = props;
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.outlineButton.size[size];
  const variant = theme.buttonStyles.outlineButton.variant[styleType];

  return (
    <StyledButton
      ref={ref}
      block={block}
      buttonSize={buttonSize}
      variant={variant}
      type="button"
      hasMinWidth={hasMinWidth}
      {...other}
    >
      {children}
    </StyledButton>
  );
});

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /** Applies a preset min-width to the button for consistency */
  hasMinWidth: PropTypes.bool
};

OutlineButton.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default',
  hasMinWidth: false
};

export default OutlineButton;
