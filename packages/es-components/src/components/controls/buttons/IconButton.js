import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import OutlineButton from './OutlineButton';
import { useTheme } from '../../util/useTheme';
import genName from '../../util/generateAlphaName';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: ${props => props.maxWidth};
`;

const StyledIconButton = styled(OutlineButton)`
  background-color: ${props => props.isHighlighted && props.activeColor};
  border-radius: 50%;
  border-width: 3px;
  color: ${props => props.isHighlighted && props.theme.colors.white};
  display: inline-block;
  font-weight: normal;
  min-width: 0;
  padding: 13px 14px;
  width: auto;
  -webkit-tap-highlight-color: transparent;
`;

const IncompleteButton = styled(StyledIconButton)`
  background-color: ${props =>
    props.isHighlighted ? props.theme.colors.gray5 : props.theme.colors.white};
  border-left: 3px dashed ${props => props.theme.colors.gray5};
  color: ${props =>
    props.isHighlighted ? props.theme.colors.white : props.theme.colors.gray5};
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

const IconText = styled.span`
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => (props.isHighlighted ? 'bold' : 'normal')};
  margin-top: 6px;
  max-width: ${props => props.maxWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function IconButton({
  iconName,
  iconSize,
  childrenFontSize,
  isHighlighted,
  isIncomplete,
  disabled,
  maxWidth,
  onClick,
  styleType,
  children,
  ...otherProps
}) {
  const CurrentButton = isIncomplete ? IncompleteButton : StyledIconButton;
  const theme = useTheme();
  const textId = genName();
  const buttonStyle = theme.buttonStyles.outlineButton.variant[styleType];

  return (
    <Container maxWidth={maxWidth} {...otherProps}>
      <CurrentButton
        onClick={onClick}
        styleType={styleType}
        isHighlighted={isHighlighted}
        disabled={disabled}
        activeColor={buttonStyle.bgColor}
        aria-labelledby={textId}
      >
        <Icon name={iconName} size={iconSize} />
      </CurrentButton>
      <IconText
        id={textId}
        isHighlighted={isHighlighted}
        maxWidth={maxWidth}
        fontSize={childrenFontSize}
      >
        {children}
      </IconText>
    </Container>
  );
}

IconButton.propTypes = {
  /** Used to specify the icon used within the button */
  iconName: PropTypes.string.isRequired,
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
  styleType: PropTypes.string,
  /** Content to be displayed below the icon */
  children: PropTypes.node
};

IconButton.defaultProps = {
  isHighlighted: false,
  isIncomplete: false,
  iconSize: 45,
  childrenFontSize: 18,
  disabled: false,
  maxWidth: undefined,
  onClick: () => {},
  styleType: 'magenta',
  children: undefined
};

export default IconButton;
