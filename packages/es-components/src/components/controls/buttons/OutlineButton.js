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
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-top: ${props => props.buttonSize.paddingTop};
  text-align: center;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: background-color 250ms linear, color 250ms linear;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: ${props => (props.block ? 'block' : 'inline-block')};
    width: ${props => (props.block ? '100%' : 'initial')};
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
`;

function InnerButton({ children, styleType, size, block, innerRef, ...other }) {
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.outlineButton.size[size];
  const variant = theme.buttonStyles.outlineButton.variant[styleType];
  const sharedProps = {
    block,
    buttonSize,
    ref: innerRef,
    variant,
    ...other
  };

  return (
    <StyledButton type="button" {...sharedProps}>
      {children}
    </StyledButton>
  );
}

const OutlineButton = React.forwardRef((props, ref) => (
  <InnerButton innerRef={ref} {...props} />
));

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool
};

OutlineButton.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default'
};

export default OutlineButton;
