import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import styled from 'styled-components';

import Fade from '../../util/Fade';
import LinkButton from '../../controls/buttons/LinkButton';

import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';

import generateAlphaName from '../../util/generateAlphaName';

const TooltipBase = styled.div`
  position: absolute;
  z-index: 999;
`;

const TooltipInner = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 2px;
  color: ${props => props.theme.colors.white};
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
  margin-top: -5px;
  padding: 5px 0;
`;

const TooltipRight = styled(TooltipBase)`
  margin-right: 5px;
  padding: 0 5px;
`;

const TooltipBottom = styled(TooltipBase)`
  margin-bottom: 5px;
  padding: 5px 0;
`;

const TooltipLeft = styled(TooltipBase)`
  margin-left: -5px;
  padding: 0 5px;
`;

const TooltipArrowTop = styled(TooltipArrowBase)`
  border-top-color: ${props => props.theme.colors.primary};
  border-width: 5px 5px 0;
  bottom: 0;
  left: 50%;
  margin-left: -5px;
`;

const TooltipArrowRight = styled(TooltipArrowBase)`
  border-right-color: ${props => props.theme.colors.primary};
  border-width: 5px 5px 5px 0;
  left: 0;
  margin-top: -5px;
  top: 50%;
`;

const TooltipArrowBottom = styled(TooltipArrowBase)`
  border-bottom-color: ${props => props.theme.colors.primary};
  border-width: 0 5px 5px;
  left: 50%;
  margin-left: -5px;
  top: 0;
`;

const TooltipArrowLeft = styled(TooltipArrowBase)`
  border-left-color: ${props => props.theme.colors.primary};
  border-width: 5px 0 5px 5px;
  margin-top: -5px;
  right: 0;
  top: 50%;
`;

const StyledButton = styled(LinkButton)`
  border-bottom: 1px dashed;
  border-radius: 0;
  color: ${props => props.theme.colors.primary};
  line-height: initial;
  margin-bottom: 3px;
  text-decoration: none;

  &:hover,
  :focus {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const FadeTransition = props => (
  <Fade duration={200} opacity={1} withWrapper {...props} />
);

const Popup = props => {
  const { name, children, position, style, ...other } = props;
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

  return (
    <TooltipStyled
      role="tooltip"
      id={tooltipId}
      style={style}
      aria-live="polite"
      {...other}
    >
      <TooltipArrow />
      <TooltipInner>{children}</TooltipInner>
    </TooltipStyled>
  );
};

Popup.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any.isRequired,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  style: PropTypes.object
};

Popup.defaultProps = {
  name: undefined,
  position: 'top',
  style: {}
};

const SrContentContainer = screenReaderOnly('div');

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

  const tooltipTarget = React.createRef();
  const descriptionId = React.useRef(`${generateAlphaName()}-description`);

  return (
    <>
      <StyledButton
        ref={tooltipTarget}
        onBlur={hideTooltip}
        onFocus={!disableFocus ? showTooltip : undefined}
        onMouseEnter={!disableHover ? showTooltip : undefined}
        onMouseLeave={!disableHover ? hideTooltip : undefined}
        onMouseDown={toggleShow}
        onKeyDown={closeOnEscape}
        onClick={() => {}}
        aria-describedby={descriptionId.current}
      >
        {children}
      </StyledButton>
      <SrContentContainer id={descriptionId.current}>
        {content}
      </SrContentContainer>

      <Overlay
        show={show}
        placement={position}
        container={document.body}
        target={() => tooltipTarget.current}
        transition={FadeTransition}
      >
        <Popup position={position} name={name} {...other}>
          {content}
        </Popup>
      </Overlay>
    </>
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
