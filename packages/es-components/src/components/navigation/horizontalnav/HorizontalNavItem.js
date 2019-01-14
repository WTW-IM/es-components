import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { noop } from 'lodash';

const AnchorBase = styled.a`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  display: flex;
  justify-content: center;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  padding: 5px 20px;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.colors.gray2};
    color: ${props => props.theme.colors.info};
  }

  ${props =>
    props.isActive &&
    css`
      background-color: ${props.theme.colors.info};
      color: ${props.theme.colors.white};

      &:hover {
        background-color: ${props.theme.colors.info};
        color: ${props.theme.colors.white};
      }
    `} ${props =>
    props.isDisabled &&
    css`
      background-color: ${props.theme.colors.gray1};
      color: ${props.theme.colors.gray6};
      cursor: not-allowed;

      > span {
        pointer-events: none;
      }

      &:hover {
        background-color: ${props.theme.colors.gray1};
        color: ${props.theme.colors.gray6};
      }
    `};
`;

const AnchorAltStyle = styled(AnchorBase)`
  margin-bottom: 8px;
  &:hover {
    color: ${props => props.theme.colors.black}
    border-bottom: 4px solid ${props => props.theme.colors.info};
  }

  ${props =>
    props.isActive &&
    css`
      color: ${props.theme.colors.black}
      background-color: ${props.theme.colors.gray1};
      border-bottom: 4px solid ${props.theme.brandColors.vbMagenta};

      &:hover {
        background-color: ${props.theme.colors.gray1};
        border-bottom: 4px solid ${props.theme.brandColors.vbMagenta};
      }
    `} ${props =>
  props.isDisabled &&
  css`
    &:hover {
      color: ${props.theme.colors.gray6};
      border-bottom: none;
    }
  `};
`;

const FlexSpan = styled.span`
  flex-grow: 1;
  text-align: center;
`;

export function HorizontalNavItem(props) {
  const {
    useAltStyle,
    children,
    className,
    highlightedId,
    id,
    isDisabled,
    isExternalLink,
    onClick,
    onNavClick,
    targetUrl
  } = props;

  const onNavItemClicked = () => {
    onNavClick(id);
    onClick(id);
  };

  const AnchorStyled = useAltStyle ? AnchorAltStyle : AnchorBase;
  const href = targetUrl || '#/';
  const openExternal = targetUrl && isExternalLink;
  const target = openExternal ? '_blank' : '_self';

  const itemProps = {
    className,
    href,
    isActive: id === highlightedId,
    isDisabled,
    onClick: isDisabled ? noop : onNavItemClicked,
    target
  };

  return (
    <li className="es-horizontalnav__navitem">
      <AnchorStyled {...itemProps}>
        <FlexSpan>{children}</FlexSpan>
      </AnchorStyled>
    </li>
  );
}

HorizontalNavItem.propTypes = {
  /** @ignore */
  useAltStyle: PropTypes.bool,
  /** Item content */
  children: PropTypes.any,
  /** Additional CSS classes to apply */
  className: PropTypes.string,
  /** @ignore */
  highlightedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Each item must have a unique identifier */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Disable the nav item to render it un-clickable */
  isDisabled: PropTypes.bool,
  /** @ignore */
  isHighlighted: PropTypes.bool,
  /** Used to assign an onClick event */
  onClick: PropTypes.func,
  /** @ignore */
  onNavClick: PropTypes.func,
  /** Sets the link to open in a new browser window */
  isExternalLink: PropTypes.bool,
  /** Set the href target for the link */
  targetUrl: PropTypes.string
};

HorizontalNavItem.defaultProps = {
  useAltStyle: false,
  isDisabled: false,
  isExternalLink: false,
  onClick: noop,
  children: undefined,
  className: undefined,
  highlightedId: undefined,
  isHighlighted: false,
  onNavClick: noop,
  targetUrl: undefined
};
