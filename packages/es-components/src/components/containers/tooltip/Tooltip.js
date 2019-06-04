import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'styled-components';

import Fade from '../../util/Fade';
import PopoverLink from '../../controls/buttons/PopoverLink';
import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';
import useUniqueId from '../../util/useUniqueId';

const TooltipBase = styled.div`
  position: absolute;
  z-index: 999;
`;

const TooltipInner = styled.div`
  background-color: ${props => props.theme.colors.softwareBlue};
  border-radius: 2px;
  color: ${props => props.theme.colors.white};
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: 15px;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  max-width: 250px;
  padding: 3px 8px;
  text-align: left;
`;

const TooltipArrowBase = styled.div`
  border-color: transparent;
  border-style: solid;
  height: 0;
  position: absolute;
  width: 0;
`;

const TooltipTop = styled(TooltipBase)`
  padding: 5px 0;
`;

const TooltipRight = styled(TooltipBase)`
  padding: 0 5px;
`;

const TooltipBottom = styled(TooltipBase)`
  padding: 5px 0;
`;

const TooltipLeft = styled(TooltipBase)`
  padding: 0 5px;
`;

const TooltipArrowTop = styled(TooltipArrowBase)`
  border-top-color: ${props => props.theme.colors.softwareBlue};
  border-width: 5px 5px 0;
  bottom: 0;
`;

const TooltipArrowRight = styled(TooltipArrowBase)`
  border-right-color: ${props => props.theme.colors.softwareBlue};
  border-width: 5px 5px 5px 0;
  left: 0;
`;

const TooltipArrowBottom = styled(TooltipArrowBase)`
  border-bottom-color: ${props => props.theme.colors.softwareBlue};
  border-width: 0 5px 5px;
  top: 0;
`;

const TooltipArrowLeft = styled(TooltipArrowBase)`
  border-left-color: ${props => props.theme.colors.softwareBlue};
  border-width: 5px 0 5px 5px;
  right: 0;
`;

const ScreenReaderContent = screenReaderOnly('div');

function Tooltip(props) {
  const [show, setShow] = useState(false);
  const {
    name,
    disableHover,
    disableFocus,
    position,
    content,
    children,
    ...other
  } = props;

  let TooltipStyled;
  let TooltipArrow;
  const tooltipId = name ? `es-tooltip__${name}` : undefined;

  switch (position) {
    case 'right':
      TooltipStyled = TooltipRight;
      TooltipArrow = TooltipArrowRight;
      break;
    case 'bottom':
      TooltipStyled = TooltipBottom;
      TooltipArrow = TooltipArrowBottom;
      break;
    case 'left':
      TooltipStyled = TooltipLeft;
      TooltipArrow = TooltipArrowLeft;
      break;
    default:
      TooltipStyled = TooltipTop;
      TooltipArrow = TooltipArrowTop;
      break;
  }

  function showTooltip() {
    setShow(true);
  }

  function hideTooltip() {
    setShow(false);
  }

  function toggleShow() {
    setShow(!show);
  }

  function closeOnEscape(event) {
    if (event.keyCode === 27) {
      setShow(false);
    }
  }

  const descriptionId = `${useUniqueId(other.id)}-description`;

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <PopoverLink
            ref={ref}
            onBlur={hideTooltip}
            onFocus={!disableFocus ? showTooltip : undefined}
            onMouseEnter={!disableHover ? showTooltip : undefined}
            onMouseLeave={!disableHover ? hideTooltip : undefined}
            onKeyDown={closeOnEscape}
            onClick={toggleShow}
            aria-describedby={descriptionId}
          >
            {children}
          </PopoverLink>
        )}
      </Reference>

      <ScreenReaderContent id={descriptionId}>{content}</ScreenReaderContent>

      <Popper placement={position}>
        {({ ref, style, placement, arrowProps }) => (
          <Fade in={show} mountOnEnter unmountOnExit>
            <TooltipStyled
              ref={ref}
              role="tooltip"
              id={tooltipId}
              style={style}
              aria-live="polite"
              {...other}
            >
              <TooltipArrow ref={arrowProps.ref} style={arrowProps.style} />
              <TooltipInner>{content}</TooltipInner>
            </TooltipStyled>
          </Fade>
        )}
      </Popper>
    </Manager>
  );
}

Tooltip.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  /** The text the tooltip displays */
  content: PropTypes.node.isRequired,
  /** Set the position of the tooltip over the content */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Disables the default show onHover functionality */
  disableHover: PropTypes.bool,
  /** Disables the default show onFocus functionality */
  disableFocus: PropTypes.bool
};

Tooltip.defaultProps = {
  position: 'top',
  disableHover: false,
  disableFocus: false
};

export default Tooltip;
