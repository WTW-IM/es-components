import React, { Component, PropTypes } from 'react';
import Overlay from 'react-overlays/lib/Overlay';
import Transition from 'react-overlays/lib/Transition';
import styled, { injectGlobal } from 'styled-components';
import { colors } from '../../theme';

/* eslint-disable no-unused-expressions */
injectGlobal`
  .tooltip-transition-out {
    opacity: 0;
    transition: opacity 200ms linear;
  }

  .tooltip-transition-in {
    opacity: .9;
  }
`;
/* eslint-enable no-unused-expressions */

const TooltipBase = styled.div`
  position: absolute;
`;

const TooltipInner = styled.div`
  background-color: ${colors.black};
  border-radius: 2px;
  color: ${colors.white};
  font-family: sans-serif;
  font-size: 12px;
  padding: 4px 8px 5px 8px;
  text-align: center;
`;

const TooltipArrowBase = styled.div`
  border-color: transparent;
  border-style: solid;
  height: 0;
  position: absolute;
  width: 0;
`;

const TooltipTop = styled(TooltipBase)`
  margin-top: -3px;
  padding: 5px 0;
`;

const TooltipRight = styled(TooltipBase)`
  margin-right: 3px;
  padding: 0 5px;
`;

const TooltipBottom = styled(TooltipBase)`
  margin-bottom: 3px;
  padding: 5px 0;
`;

const TooltipLeft = styled(TooltipBase)`
  margin-left: -3px;
  padding: 0 5px;
`;

const TooltipArrowTop = styled(TooltipArrowBase)`
  border-top-color: ${colors.black};
  border-width: 5px 5px 0;
  bottom: 0;
  left: 50%;
  margin-left: -5px;
`;

const TooltipArrowRight = styled(TooltipArrowBase)`
  border-right-color: ${colors.black};
  border-width: 5px 5px 5px 0;
  left: 0;
  margin-top: -5px;
  top: 50%;
`;

const TooltipArrowBottom = styled(TooltipArrowBase)`
  border-bottom-color: ${colors.black};
  border-width: 0 5px 5px;
  left: 50%;
  margin-left: -5px;
  top: 0;
`;

const TooltipArrowLeft = styled(TooltipArrowBase)`
  border-left-color: ${colors.black};
  border-width: 5px 0 5px 5px;
  margin-top: -5px;
  right: 0;
  top: 50%;
`;

const Fade = (props) => (
  <Transition
    className="tooltip-transition-out"
    enteredClassName="tooltip-transition-in"
    enteringClassName="tooltip-transition-in"
    in={props.in}
    mountOnEnter
    unmountOnExit
    timeout={5000}
    transitionAppear
  >
    {props.children}
  </Transition>
);

Fade.propTypes = {
  children: PropTypes.any.isRequired,
  in: PropTypes.bool
};

const Popup = (props) => {
  const { className, children, position, style } = props;
  let TooltipStyled;
  let TooltipArrow;

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
    <TooltipStyled className={className} style={{ ...style }}>
      <TooltipArrow />
      <TooltipInner>
        {children}
      </TooltipInner>
    </TooltipStyled>
  );
};

Popup.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  style: PropTypes.object
};

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  show() {
    return this.setState({ show: true });
  }

  hide() {
    return this.setState({ show: false });
  }

  render() {
    return (
      <span>
        <span
          ref={(span) => { this.toolTipTarget = span; }}
          onMouseEnter={() => this.show()}
          onMouseLeave={() => this.hide()}
        >
          {this.props.children}
        </span>

        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement={this.props.position}
          container={document.body}
          target={props => this.toolTipTarget}
          transition={Fade}
        >
          <Popup position={this.props.position}>
            {this.props.content}
          </Popup>
        </Overlay>
      </span>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.any.isRequired,
  /** The text the tooltip displays */
  content: PropTypes.node.isRequired,
  /** Set the position of the tooltip over the content */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

Tooltip.defaultProps = {
  position: 'top'
};

export default Tooltip;
