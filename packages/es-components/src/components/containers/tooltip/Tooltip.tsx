import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  autoPlacement,
  arrow,
  flip,
  shift,
  Placement
} from '@floating-ui/react';
import styled, { StyledComponent, DefaultTheme } from 'styled-components';

import Fade from '../../util/Fade';
import PopoverLink from '../../controls/buttons/PopoverLink';
import {
  buttonVariantStyleTypes,
  ButtonVariantStyleType
} from 'es-components-shared-types';
import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';
import useUniqueId from '../../util/useUniqueId';
import useRootNode from '../../util/useRootNode';
import useTopZIndex from '../../../hooks/useTopZIndex';
import callRef from '../../util/callRef';

type TooltipStyleProps = { topIndex: number };

const TooltipBase = styled.div<TooltipStyleProps>`
  position: absolute;
  z-index: ${({ topIndex }) => topIndex};
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

type AllTooltipProps = React.ComponentPropsWithRef<typeof TooltipBase>;
type AllTooltipArrowProps = React.ComponentPropsWithRef<
  typeof TooltipArrowBase
>;

const getTooltips = (
  position?: Placement
): [
  StyledComponent<'div', DefaultTheme, AllTooltipProps>,
  StyledComponent<'div', DefaultTheme, AllTooltipArrowProps>
] => {
  switch (position) {
    case 'right':
    case 'right-start':
    case 'right-end':
      return [TooltipRight, TooltipArrowRight];
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return [TooltipBottom, TooltipArrowBottom];
    case 'left':
    case 'left-start':
    case 'left-end':
      return [TooltipLeft, TooltipArrowLeft];
    case 'top':
    case 'top-start':
    case 'top-end':
    default:
      return [TooltipTop, TooltipArrowTop];
  }
};

type TooltipProps = React.PropsWithChildren<{
  name: string;
  content: React.ReactNode;
  position?: Placement;
  disableHover?: boolean;
  disableFocus?: boolean;
  styleType?: ButtonVariantStyleType;
  linkProps?: Record<string, unknown>;
  id?: string;
}>;

const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(
  function ForwardedTooltip(props, ref) {
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

    const getTopIndex = useTopZIndex();
    const tooltipId = name ? `es-tooltip__${name}` : undefined;
    const [rootNode, rootNodeRef] = useRootNode(document.body);
    const arrowRef = useRef<HTMLDivElement>(null);
    const autoPlacementMiddleware = position
      ? [flip()]
      : [autoPlacement({ alignment: 'start' })];

    const {
      x,
      y,
      placement,
      middlewareData: { arrow: arrowCoords },
      context,
      reference: floatingAnchorRef,
      floating: floatingTooltipRef,
      strategy
    } = useFloating<HTMLButtonElement>({
      open: show,
      onOpenChange: setShow,
      whileElementsMounted: autoUpdate,
      placement: position,
      middleware: [
        arrow({ element: arrowRef }),
        shift(),
        ...autoPlacementMiddleware
      ]
    });

    const { x: arrowX, y: arrowY } = arrowCoords || {};
    const [InnerTooltip, TooltipArrow] = getTooltips(placement);

    const hover = useHover(context, {
      enabled: !disableHover
    });
    const focus = useFocus(context, {
      enabled: !disableFocus
    });
    const role = useRole(context, {
      role: 'tooltip'
    });
    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      role,
      click,
      dismiss
    ]);

    const descriptionId = `${useUniqueId(idProp)}-description`;

    return (
      <>
        <PopoverLink
          ref={el => {
            callRef(floatingAnchorRef, el);
            callRef(ref, el);
            rootNodeRef(el);
          }}
          styleType={styleType}
          {...getReferenceProps({
            ...linkProps,
            'aria-describedby': descriptionId,
            onBlur: () => setShow(false)
          })}
        >
          {children}
        </PopoverLink>

        {show && (
          <ScreenReaderContent id={descriptionId}>
            {content}
          </ScreenReaderContent>
        )}

        {!rootNode ? (
          <></>
        ) : (
          ReactDOM.createPortal(
            <Fade in={show} mountOnEnter unmountOnExit>
              <InnerTooltip
                ref={floatingTooltipRef}
                topIndex={getTopIndex()}
                {...getFloatingProps({
                  id: tooltipId,
                  'aria-live': 'polite',
                  style: {
                    width: 'max-content',
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0
                  },
                  ...other
                })}
              >
                <TooltipArrow
                  ref={arrowRef}
                  style={
                    arrowX !== undefined
                      ? {
                          left: arrowX ?? 0
                        }
                      : {
                          top: arrowY ?? 0
                        }
                  }
                />
                <TooltipInner>{content}</TooltipInner>
              </InnerTooltip>
            </Fade>,
            rootNode
          )
        )}
      </>
    );
  }
);

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
  styleType: PropTypes.oneOf(buttonVariantStyleTypes),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkProps: PropTypes.shape<Record<string, any>>({})
};

Tooltip.defaultProps = {
  position: 'top',
  disableHover: false,
  disableFocus: false,
  styleType: 'default',
  linkProps: {}
};

export default Tooltip;
