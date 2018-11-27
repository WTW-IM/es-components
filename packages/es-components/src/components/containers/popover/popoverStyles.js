import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { useTheme } from '../../util/useTheme';

function getArrowSize(size) {
  switch (size) {
    case 'sm':
      return '5';
    case 'lg':
      return '20';
    case 'none':
      return '0';
    default:
      return '10';
  }
}

export function ArrowStyles(props) {
  const { name, arrowSize: size, hasTitle } = props;
  const { colors } = useTheme();
  const arrowSize = getArrowSize(size);
  const sharedStyles = `
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
    border-width: ${getArrowSize(arrowSize)}px;
  `;

  const Styles = createGlobalStyle`
    .${name}-popper { margin: ${arrowSize}px; }
    .${name}-popper .${name}-popper__arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
    }

    .${name}-popper[data-placement^="top"] .${name}-popper__arrow {
      border-color: transparent;
      border-width: ${arrowSize}px;
      border-bottom-width: 0;
      border-top-color: rgba(0, 0, 0, 0.3);
      bottom: -${arrowSize}px;
      left: calc(50% - ${arrowSize}px);

      &::after {
        ${sharedStyles}
        border-top-color: ${colors.white};
        border-bottom-width: 0;
        margin-left: -${arrowSize}px;
        bottom: 1px;
      }
    }
    
    .${name}-popper[data-placement^="bottom"] .${name}-popper__arrow {
      border-color: transparent;
      border-width: ${arrowSize}px;
      border-top-width: 0;
      border-bottom-color: rgba(0, 0, 0, 0.3);
      top: -${arrowSize}px;
      left: calc(50% - ${arrowSize}px);

      &::after {
        ${sharedStyles}
        border-bottom-color: ${hasTitle ? colors.popoverHeader : colors.white};
        border-top-width: 0;
        margin-left: -${arrowSize}px;
        top: 1px;
      }
    }

    .${name}-popper[data-placement^="left"] .${name}-popper__arrow {
      border-color: transparent;
      border-width: ${arrowSize}px;
      border-right-width: 0;
      border-left-color: rgba(0, 0, 0, 0.3);
      right: -${arrowSize}px;
      top: calc(50% - ${arrowSize}px);

      &::after {
        ${sharedStyles}
        border-left-color: ${colors.white};
        border-right-width: 0;
        margin-left: -${arrowSize}px;
        right: 1px;
        top: calc(50% - ${arrowSize}px);
      }
    }

    .${name}-popper[data-placement^="right"] .${name}-popper__arrow {
      border-color: transparent;
      border-width: ${arrowSize}px;
      border-left-width: 0;
      border-right-color: rgba(0, 0, 0, 0.3);
      left: -${arrowSize}px;

      &::after {
        ${sharedStyles}
        border-right-color: ${colors.white};
        border-left-width: 0;
        margin-right: -${arrowSize}px;
        left: 1px;
        top: calc(50% - ${arrowSize}px);
      }
    }
  `;

  return <Styles />;
}

ArrowStyles.propTypes = {
  name: PropTypes.string.isRequired,
  arrowSize: PropTypes.oneOf(['sm', 'lg', 'none', 'default']).isRequired,
  hasTitle: PropTypes.bool.isRequired
};
