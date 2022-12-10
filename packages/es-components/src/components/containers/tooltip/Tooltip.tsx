import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'styled-components';

import Fade from '../../util/Fade';
import PopoverLink from '../../controls/buttons/PopoverLink';
import type { PopoverStyleType } from '../../containers/popover/PopoverShared';
import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';
import useUniqueId from '../../util/useUniqueId';
import useRootNode from '../../util/useRootNode';

const TooltipBase = styled.div`
  position: absolute;
  z-index: 999;
`;

const TooltipInner = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 2px;
  color: ${props => props.theme.colors.white};
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: 15px;
  line-height: ${props => props.theme.font.baseLineHeight};
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
  border-top-color: ${props => props.theme.colors.primary};
  border-width: 5px 5px 0;
  bottom: 0;
`;

const TooltipArrowRight = styled(TooltipArrowBase)`
  border-right-color: ${props => props.theme.colors.primary};
  border-width: 5px 5px 5px 0;
  left: 0;
`;

const TooltipArrowBottom = styled(TooltipArrowBase)`
  border-bottom-color: ${props => props.theme.colors.primary};
  border-width: 0 5px 5px;
  top: 0;
`;

const TooltipArrowLeft = styled(TooltipArrowBase)`
  border-left-color: ${props => props.theme.colors.primary};
  border-width: 5px 0 5px 5px;
  right: 0;
`;

const ScreenReaderContent = screenReaderOnly('div');
type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

const getTooltips = (position?: TooltipPosition) => {
  switch (position) {
    case 'right':
      return [TooltipRight, TooltipArrowRight];
    case 'bottom':
      return [TooltipBottom, TooltipArrowBottom];
    case 'left':
      return [TooltipLeft, TooltipArrowLeft];
    case 'top':
    default:
      return [TooltipTop, TooltipArrowTop];
  }
};

type TooltipProps = React.PropsWithChildren<{
  name: string;
  content: React.ReactNode;
  position?: TooltipPosition;
  disableHover?: boolean;
  disableFocus?: boolean;
  styleType?: PopoverStyleType;
  linkProps?: Record<string, unknown>;
  id?: string;
}>;

function Tooltip(props: TooltipProps): React.ReactNode {
  const [show, setShow] = useState(false);
  const {
    name,
    disableHover,
    disableFocus,
    position,
    content,
    styleType,
    children,
    linkProps,
    id: idProp,
    ...other
  } = props;

  const [InnerTooltip, TooltipArrow] = getTooltips(position);
  const tooltipId = name ? `es-tooltip__${name}` : undefined;
  const [rootNode, rootNodeRef] = useRootNode(document.body);

  function showTooltip() {
    setShow(true);
  }

  function hideTooltip() {
    setShow(false);
  }

  function toggleShow() {
    setShow(!show);
  }

  function closeOnEscape(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.keyCode === 27) {
      setShow(false);
    }
  }

  const descriptionId = `${useUniqueId(idProp)}-description`;

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <PopoverLink
            ref={el => {
              if (ref) {
                typeof ref === 'function' ? ref(el) : (ref.current = el);
              }
              rootNodeRef(el);
            }}
            onBlur={hideTooltip}
            onFocus={!disableFocus ? showTooltip : undefined}
            onMouseEnter={!disableHover ? showTooltip : undefined}
            onMouseLeave={!disableHover ? hideTooltip : undefined}
            onKeyDown={closeOnEscape}
            onClick={toggleShow}
            aria-describedby={descriptionId}
            styleType={styleType}
            {...linkProps}
          >
            {children}
          </PopoverLink>
        )}
      </Reference>

      {show && (
        <ScreenReaderContent id={descriptionId}>{content}</ScreenReaderContent>
      )}

      {!rootNode ? (
        <></>
      ) : (
        ReactDOM.createPortal(
          <Popper placement={position}>
            {({ ref, style, arrowProps }) => (
              <Fade in={show} mountOnEnter unmountOnExit>
                <InnerTooltip
                  ref={ref}
                  role="tooltip"
                  id={tooltipId}
                  style={style}
                  aria-live="polite"
                  {...other}
                >
                  <TooltipArrow ref={arrowProps.ref} style={arrowProps.style} />
                  <TooltipInner>{content}</TooltipInner>
                </InnerTooltip>
              </Fade>
            )}
          </Popper>,
          rootNode
        )
      )}
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
  disableFocus: PropTypes.bool,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  linkProps: PropTypes.object
};

Tooltip.defaultProps = {
  position: 'top',
  disableHover: false,
  disableFocus: false,
  styleType: undefined
};

export default Tooltip;
