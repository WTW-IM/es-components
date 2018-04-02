import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'styled-components';
import defaultTheme from '../../theme/defaultTheme';

import popoverStyles from './popoverStyles';

import { Manager, Target, Popper, Arrow } from 'react-popper';
import Transition from 'react-transition-group/Transition';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

const defaultStyle = {
  transition: 'opacity 0.2s ease-in-out',
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

function getArrowSize(size) {
  switch (size) {
    case 'sm':
      return '5';
    case 'md':
      return '10';
    case 'lg':
      return '20';
    default:
      return '0';
  }
}

function Popup({
  transitionIn,
  transitionTimeout,
  placement,
  children,
  trigger,
  onHide,
  arrowSize,
  popperModifiers,
  disableArrow,
  disableRootClose,
  hasTitle,
  theme
}) {
  const arrowStyles = popoverStyles(
    theme.colors,
    getArrowSize(arrowSize),
    hasTitle
  );
  /* eslint-disable no-unused-expressions */
  injectGlobal`${arrowStyles}`;
  /* eslint-enable no-unused-expressions */

  let popperObj = (
    <Manager>
      <Target>{trigger}</Target>
      <Transition in={transitionIn} timeout={transitionTimeout}>
        {state => (
          <Popper
            className="popper"
            placement={placement}
            modifiers={popperModifiers}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {children}
            {disableArrow ? '' : <Arrow className="popper__arrow" />}
          </Popper>
        )}
      </Transition>
    </Manager>
  );

  if (!disableRootClose) {
    popperObj = (
      <RootCloseWrapper onRootClose={onHide}>{popperObj}</RootCloseWrapper>
    );
  }

  return popperObj;
}

Popup.propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node,
  theme: PropTypes.object,
  isOpen: PropTypes.bool,
  trigger: PropTypes.node,
  transitionIn: PropTypes.bool,
  transitionTimeout: PropTypes.number,
  onHide: PropTypes.func,
  arrowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'default']),
  disablePopperEvents: PropTypes.bool,
  popperModifiers: PropTypes.object,
  disableRootClose: PropTypes.bool,
  disableArrow: PropTypes.bool,
  hasTitle: PropTypes.bool
};

Popup.defaultProps = {
  transitionTimeout: 200,
  placement: 'bottom',
  theme: defaultTheme
};

export default Popup;
