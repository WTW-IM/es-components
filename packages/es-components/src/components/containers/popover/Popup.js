import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Manager, Reference, Popper } from 'react-popper';

import Fade from '../../util/Fade';
import useRootNode from '../../util/useRootNode';

const PopperBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  margin: ${props => props.arrowSize.marginSize}px;
  max-width: 350px;
  min-width: 270px;
  position: absolute;
  text-align: center;
  z-index: 99999;
`;

const Arrow = styled.div`
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

const arrowSizes = {
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

function getArrowValues(size) {
  switch (size) {
    case 'sm':
      return arrowSizes.sm;
    case 'lg':
      return arrowSizes.lg;
    case 'none':
      return arrowSizes.none;
    default:
      return arrowSizes.md;
  }
}

function Popup(props) {
  const {
    name,
    trigger,
    children,
    position,
    arrowSize,
    hasTitle,
    transitionIn,
    transitionTimeout,
    disableFlipping,
    popperRef,
    enableEvents,
    strategy,
    ...otherProps
  } = props;
  const arrowValues = getArrowValues(arrowSize);
  const [rootNode, rootNodeRef] = useRootNode(document.body);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            className={`${name}-popper__trigger`}
            ref={el => {
              ref(el);
              rootNodeRef(el);
            }}
          >
            {trigger}
          </div>
        )}
      </Reference>

      {ReactDOM.createPortal(
        <Popper
          className={`${name}-popper`}
          placement={position}
          modifiers={{
            preventOverflow: { boundariesElement: document.body },
            flip: {
              enabled: !disableFlipping,
              behavior: ['left', 'right', 'top', 'bottom', 'top']
            }
          }}
          innerRef={popperRef}
          eventsEnabled={enableEvents}
          positionFixed={strategy === 'fixed'}
        >
          {({ ref, style, placement, arrowProps }) => (
            <Fade
              in={transitionIn}
              duration={transitionTimeout}
              mountOnEnter
              unmountOnExit
            >
              <PopperBox
                ref={ref}
                style={style}
                arrowSize={arrowValues}
                {...otherProps}
              >
                {children}
                <Arrow
                  ref={arrowProps.ref}
                  data-placement={placement}
                  style={arrowProps.style}
                  arrowSize={arrowValues}
                  hasTitle={hasTitle}
                />
              </PopperBox>
            </Fade>
          )}
        </Popper>,
        rootNode
      )}
    </Manager>
  );
}

Popup.propTypes = {
  name: PropTypes.string,
  trigger: PropTypes.node,
  children: PropTypes.node,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  arrowSize: PropTypes.oneOf(['sm', 'lg', 'none', 'default']),
  transitionIn: PropTypes.bool,
  transitionTimeout: PropTypes.number,
  hasTitle: PropTypes.bool,
  disableFlipping: PropTypes.bool,
  popperRef: PropTypes.func,
  enableEvents: PropTypes.bool,
  strategy: PropTypes.oneOf(['absolute', 'fixed'])
};

Popup.defaultProps = {
  name: '',
  trigger: undefined,
  children: undefined,
  position: 'bottom',
  arrowSize: 'default',
  transitionIn: false,
  transitionTimeout: 150,
  hasTitle: false,
  disableFlipping: false,
  popperRef: undefined,
  enableEvents: true,
  strategy: 'absolute'
};

export default Popup;
