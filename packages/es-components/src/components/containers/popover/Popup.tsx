import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CSS from 'csstype';
import {
  Manager,
  Reference,
  Popper,
  PopperProps,
  PopperChildrenProps
} from 'react-popper';
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
  offset,
  Placement
} from '@floating-ui/react';
import callRef from '../../util/callRef';

import Fade from '../../util/Fade';
import useRootNode from '../../util/useRootNode';

const PopperBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  max-width: 350px;
  min-width: 270px;
  position: absolute;
  text-align: center;
  z-index: 99999;
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

interface PopupProps {
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
}

type ESPopperType = typeof React.Component<
  PopperProps<string> & Omit<JSXElementProps<'div'>, 'children'>
>;

const ESPopper = Popper as ESPopperType;

const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function ForwardedPopup(props, ref) {
    const {
      name,
      trigger,
      children,
      position,
      arrowSize,
      hasTitle,
      transitionIn: isOpen,
      transitionTimeout,
      disableFlipping,
      popperRef,
      enableEvents,
      strategy,
      keepTogether,
      ...otherProps
    } = props;
    const arrowValues = getArrowValues(arrowSize);
    const [rootNode, rootNodeRef] = useRootNode(document.body);

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div
              className={`${name || ''}-popper__trigger`}
              ref={el => {
                callRef(ref, el);
                rootNodeRef(el);
              }}
            >
              {trigger}
            </div>
          )}
        </Reference>

        {!rootNode ? (
          <></>
        ) : (
          ReactDOM.createPortal(
            <ESPopper
              className={`${name || ''}-popper`}
              placement={position}
              strategy={strategy}
              innerRef={popperRef}
              modifiers={[
                {
                  name: 'preventOverflow',
                  options: {
                    boundariesElement: document.body,
                    tether: keepTogether
                  }
                },
                ...(disableFlipping
                  ? []
                  : [
                      {
                        name: 'flip',
                        options: {
                          fallbackPlacements: ['left', 'right', 'top', 'bottom']
                        }
                      }
                    ]),
                {
                  name: 'offset',
                  options: {
                    offset: [0, parseInt(arrowValues.marginSize, 10)]
                  }
                },
                {
                  name: 'eventListeners',
                  options: {
                    scroll: enableEvents,
                    resize: enableEvents
                  }
                }
              ]}
            >
              {({ ref, style, placement, arrowProps }: PopperChildrenProps) => (
                <Fade
                  in={isOpen}
                  duration={transitionTimeout}
                  mountOnEnter
                  unmountOnExit
                >
                  <PopperBox ref={ref} style={style} {...otherProps}>
                    {children}
                    <Arrow
                      ref={arrowProps.ref}
                      data-placement={placement}
                      style={arrowProps.style}
                      arrowSize={arrowValues}
                      hasTitle={Boolean(hasTitle)}
                    />
                  </PopperBox>
                </Fade>
              )}
            </ESPopper>,
            rootNode
          )
        )}
      </Manager>
    );
  }
);

Popup.propTypes = {
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
  keepTogether: PropTypes.bool
};

Popup.defaultProps = {
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

export default Popup;
