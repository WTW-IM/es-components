import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CSS from 'csstype';
import {
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  autoUpdate,
  arrow,
  flip,
  shift,
  limitShift,
  offset,
  Placement,
  FloatingPortal
} from '@floating-ui/react';
import { callRefs } from '../../util/callRef';

import Fade from '../../util/Fade';
import useRootNode from '../../util/useRootNode';
import useTopZIndex from '../../../hooks/useTopZIndex';

const PopperBox = styled.div<{ topIndex: number }>`
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  max-width: 350px;
  min-width: 270px;
  position: absolute;
  text-align: center;
  z-index: ${({ topIndex }) => topIndex};
`;

type NumberString = `${number}`;

interface ArrowSizeProperties {
  size: NumberString;
  borderSize: CSS.Property.BorderWidth;
  marginSize: NumberString;
  bottomWidth?: CSS.Property.BorderWidth;
  bottomBorderWidth?: CSS.Property.BorderWidth;
  rightWidth?: CSS.Property.BorderWidth;
  rightBorderWidth?: CSS.Property.BorderWidth;
  borderColor?: CSS.Property.BorderColor;
}

type ArrowSizes = 'sm' | 'md' | 'lg' | 'none';
type ArrowSizeOptions = ArrowSizes | 'default';

type ArrowSizeDefinitions = {
  [key in ArrowSizes]: ArrowSizeProperties;
};

const arrowSizes: ArrowSizeDefinitions = {
  sm: {
    size: '5',
    borderSize: '6',
    marginSize: '10',
    bottomWidth: '0 5px 5px',
    bottomBorderWidth: '0 6px 5px',
    rightWidth: '5px 5px 5px 0',
    rightBorderWidth: '6px 5px 6px 0',
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  md: {
    size: '10',
    borderSize: '11',
    marginSize: '15',
    bottomWidth: '0 10px 10px',
    bottomBorderWidth: '0 11px 10px',
    rightWidth: '10px 10px 10px 0',
    rightBorderWidth: '11px 10px 11px 0',
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  lg: {
    size: '20',
    borderSize: '21',
    marginSize: '30',
    bottomWidth: '0 20px 20px',
    bottomBorderWidth: '0 21px 20px',
    rightWidth: '20px 20px 20px 0',
    rightBorderWidth: '21px 20px 21px 0',
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  none: {
    size: '0',
    borderSize: '0',
    marginSize: '10'
  }
};

const Arrow = styled.div<{ arrowSize: ArrowSizeProperties; hasTitle: boolean }>`
  position: absolute;
  &::before,
  &::after {
    border: solid transparent;
    content: '';
    position: absolute;
  }
  &[data-placement*='bottom'] {
    top: 0;
    left: 0;
    margin-top: -${props => props.arrowSize.size}px;
    &::before {
      border-width: ${props => props.arrowSize.bottomBorderWidth};
      border-color: transparent;
      border-bottom-color: ${props => props.arrowSize.borderColor};
      margin-left: -${props => props.arrowSize.borderSize}px;
    }
    &::after {
      border-width: ${props => props.arrowSize.bottomWidth};
      border-color: transparent;
      border-bottom-color: ${props =>
        props.hasTitle ? props.theme.colors.primary : props.theme.colors.white};
      margin-left: -${props => props.arrowSize.size}px;
    }
  }
  &[data-placement*='top'] {
    &::before {
      border-width: ${props => props.arrowSize.borderSize}px;
      border-color: transparent;
      border-top-color: ${props => props.arrowSize.borderColor};
      margin-left: -${props => props.arrowSize.borderSize}px;
    }
    &::after {
      border-width: ${props => props.arrowSize.size}px;
      border-color: transparent;
      border-top-color: ${props => props.theme.colors.white};
      margin-left: -${props => props.arrowSize.size}px;
    }
  }
  &[data-placement*='right'] {
    margin-left: -${props => props.arrowSize.size}px;
    &::before {
      border-width: ${props => props.arrowSize.rightBorderWidth};
      border-color: transparent;
      border-right-color: ${props => props.arrowSize.borderColor};
      margin-top: -${props => props.arrowSize.borderSize}px;
    }
    &::after {
      border-width: ${props => props.arrowSize.rightWidth};
      border-color: transparent;
      border-right-color: ${props => props.theme.colors.white};
      margin-top: -${props => props.arrowSize.size}px;
    }
  }
  &[data-placement*='left'] {
    right: 0;
    &::before {
      border-width: ${props => props.arrowSize.borderSize}px;
      border-color: transparent;
      border-left-color: ${props => props.arrowSize.borderColor};
      margin-top: -${props => props.arrowSize.borderSize}px;
    }
    &::after {
      border-width: ${props => props.arrowSize.size}px;
      border-color: transparent;
      border-left-color: ${props => props.theme.colors.white};
      margin-top: -${props => props.arrowSize.size}px;
    }
  }
`;

function getArrowValues(size?: Maybe<ArrowSizeOptions>) {
  switch (size) {
    case 'sm':
      return arrowSizes.sm;
    case 'lg':
      return arrowSizes.lg;
    case 'none':
      return arrowSizes.none;
    case 'md':
    case 'default':
    default:
      return arrowSizes.md;
  }
}

interface PopupProps extends JSXElementProps<'div'> {
  name?: Maybe<string>;
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: Placement;
  arrowSize?: Maybe<ArrowSizeOptions>;
  transitionIn?: boolean;
  transitionTimeout?: number;
  hasTitle?: boolean;
  disableFlipping?: boolean;
  popperRef?: React.ForwardedRef<HTMLDivElement>;
  enableEvents?: boolean;
  strategy?: 'absolute' | 'fixed';
  keepTogether?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disableRootClose: boolean;
}

const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function ForwardedPopup(props, forwardedRef) {
    const {
      name,
      trigger,
      children,
      position,
      arrowSize,
      hasTitle,
      transitionIn: isOpen,
      setIsOpen,
      transitionTimeout,
      disableFlipping,
      popperRef,
      enableEvents,
      strategy,
      keepTogether,
      disableRootClose,
      ...otherProps
    } = props;
    const arrowValues = getArrowValues(arrowSize);
    const [rootNode, rootNodeRef] = useRootNode(document.body);
    const arrowRef = useRef<HTMLDivElement>(null);
    const getTopIndex = useTopZIndex();

    const flipMiddleware = disableFlipping ? [] : [flip()];
    const {
      x,
      y,
      placement,
      context,
      reference: floatingAnchorRef,
      floating: floatingPopupRef,
      middlewareData: { arrow: arrowCoords }
    } = useFloating<HTMLElement>({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: position,
      ...(enableEvents ? { whileElementsMounted: autoUpdate } : {}),
      middleware: [
        ...flipMiddleware,
        shift({
          padding: arrowValues.marginSize,
          ...(keepTogether
            ? {
                limiter: limitShift()
              }
            : {})
        }),
        offset({
          mainAxis: parseInt(arrowValues.marginSize, 10)
        }),
        arrow({
          element: arrowRef
        })
      ]
    });
    const { x: arrowX, y: arrowY } = arrowCoords || {};

    const role = useRole(context);
    const dismiss = useDismiss(context, {
      outsidePress: !disableRootClose,
      outsidePressEvent: 'click'
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      role,
      dismiss
    ]);

    return (
      <>
        <div
          ref={el => callRefs(el, floatingAnchorRef, forwardedRef, rootNodeRef)}
          {...getReferenceProps({ className: `${name || ''}-popper__trigger` })}
        >
          {trigger}
        </div>
        <FloatingPortal root={rootNode}>
          <Fade
            in={isOpen}
            duration={transitionTimeout}
            mountOnEnter
            unmountOnExit
          >
            <PopperBox
              ref={el => callRefs(el, floatingPopupRef, popperRef || null)}
              topIndex={getTopIndex()}
              {...getFloatingProps({
                ...otherProps,
                style: {
                  ...(otherProps.style || {}),
                  position: strategy,
                  top: y || 0,
                  left: x || 0,
                  width: 'max-content'
                }
              })}
            >
              {children}
              <Arrow
                ref={arrowRef}
                data-placement={placement}
                style={
                  arrowX !== undefined
                    ? {
                        left: arrowX ?? 0
                      }
                    : {
                        top: arrowY ?? 0
                      }
                }
                arrowSize={arrowValues}
                hasTitle={Boolean(hasTitle)}
              />
            </PopperBox>
          </Fade>
        </FloatingPortal>
      </>
    );
  }
);

Popup.propTypes = {
  ...PopperBox.propTypes,
  name: PropTypes.string,
  trigger: PropTypes.node,
  children: PropTypes.node,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  arrowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'none', 'default']),
  transitionIn: PropTypes.bool,
  transitionTimeout: PropTypes.number,
  hasTitle: PropTypes.bool,
  disableFlipping: PropTypes.bool,
  popperRef: PropTypes.func,
  enableEvents: PropTypes.bool,
  strategy: PropTypes.oneOf(['absolute', 'fixed']),
  keepTogether: PropTypes.bool,
  setIsOpen: PropTypes.func.isRequired,
  disableRootClose: PropTypes.bool.isRequired
};

Popup.defaultProps = {
  ...PopperBox.defaultProps,
  name: '',
  trigger: undefined,
  children: undefined,
  position: 'bottom' as Placement,
  arrowSize: 'default',
  transitionIn: false,
  transitionTimeout: 150,
  hasTitle: false,
  disableFlipping: false,
  popperRef: undefined,
  enableEvents: true,
  strategy: 'absolute',
  keepTogether: true
};
