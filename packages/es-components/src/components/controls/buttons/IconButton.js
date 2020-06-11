import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';

const IconWithBorder = styled(Icon)`
  background-color: ${props => props.theme.colors.white};
  border: 2px solid;
  border-color: ${props => props.theme.brandColors.primary3};
  border-radius: 50%;
  color: ${props => props.theme.brandColors.primary3};
  padding: 5px;
`;
const HighlightedIconWithBorder = styled(IconWithBorder)`
  background-color: ${props => props.theme.brandColors.primary3};
  color: ${props => props.theme.colors.white};
`;
const ChildrenSpan = styled.span`
  color: ${props => props.theme.colors.gray9};
  font-size: ${props => props.fontSize}px;
  font-weight: normal;
  max-width: ${props => props.maxWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const HighlightedChildrenSpan = styled(ChildrenSpan)`
  font-weight: bold;
`;
const ContainerButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-bottom-left-radius: ${props => props.borderRadii};
  border-bottom-right-radius: ${props => props.borderRadii};
  border-top-left-radius: ${props => props.borderRadii};
  border-top-right-radius: ${props => props.borderRadii};
  box-shadow: none;
  cursor: ${props => (props.disabled ? '' : 'pointer')};
  display: flex;
  flex-direction: column;
  font-family: inherit;
  position: relative;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover:enabled:not(:focus),
  &:focus:enabled {
    box-shadow: 0 0 0 0.2rem ${props => props.theme.brandColors.primary3};
    outline: 0;
  }

  &:active:enabled ${IconWithBorder} {
    background-color: ${props => props.theme.brandColors.primary3};
    color: ${props => props.theme.colors.white};
  }
  &:active:enabled ${HighlightedIconWithBorder} {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.brandColors.primary3};
  }

  &:active:enabled ${ChildrenSpan} {
    font-weight: bold;
  }
  &:active:enabled ${HighlightedChildrenSpan} {
    font-weight: normal;
  }
`;

function IconButton({
  iconName,
  iconSize,
  childrenFontSize,
  isHighlighted,
  disabled,
  maxWidth,
  onClick,
  borderRadiiSize,
  children,
  ...otherProps
}) {
  const CurrentIcon = isHighlighted
    ? HighlightedIconWithBorder
    : IconWithBorder;
  const CurrentSpan = isHighlighted ? HighlightedChildrenSpan : ChildrenSpan;

  return (
    <ContainerButton
      onClick={onClick}
      isHighlighted={isHighlighted}
      disabled={disabled}
      borderRadii={borderRadiiSize}
      {...otherProps}
    >
      <CurrentIcon
        name={iconName}
        size={iconSize}
        isHighlighted={isHighlighted}
      />
      <CurrentSpan
        isHighlighted={isHighlighted}
        maxWidth={maxWidth}
        fontSize={childrenFontSize}
      >
        {children}
      </CurrentSpan>
    </ContainerButton>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  childrenFontSize: PropTypes.number,
  isHighlighted: PropTypes.bool,
  disabled: PropTypes.bool,
  maxWidth: PropTypes.string,
  borderRadiiSize: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

IconButton.defaultProps = {
  isHighlighted: false,
  iconSize: 32,
  childrenFontSize: 15,
  disabled: false,
  maxWidth: '',
  borderRadiiSize: '.25rem',
  onClick: () => {},
  children: null
};

export default IconButton;
