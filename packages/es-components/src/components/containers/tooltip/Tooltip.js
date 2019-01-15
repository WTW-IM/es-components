/* eslint react/no-unused-prop-types: 0 */
/* ^^^ We need to declare the Theme prop for documentation. */

import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import styled from 'styled-components';
import classnames from 'classnames';

import Fade from '../../util/Fade';

import Button from '../../controls/buttons/Button';

const TooltipBase = styled.div`
  position: absolute;
  z-index: 2;
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

const StyledButton = styled(Button)`
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
  const { name, className, children, position, style } = props;
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
      className={classnames('es-tooltip', className)}
      id={tooltipId}
      style={style}
    >
      <TooltipArrow />
      <TooltipInner>{children}</TooltipInner>
    </TooltipStyled>
  );
};

Popup.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  style: PropTypes.object
};

Popup.defaultProps = {
  name: undefined,
  className: undefined,
  position: 'top',
  style: {}
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  show = () => this.setState({ show: true });

  hide = () => this.setState({ show: false });

  toggleShow = () => {
    this.setState(({ show }) => ({ show: !show }));
  };

  closeOnEscape = event => {
    if (event.keyCode === 27) {
      this.setState({ show: false });
    }
  };

  render() {
    return (
      <span>
        <StyledButton
          className="es-tooltip__target"
          ref={span => {
            this.toolTipTarget = span;
          }}
          isLinkButton
          onBlur={this.hide}
          onFocus={!this.props.disableFocus ? this.show : undefined}
          onMouseEnter={!this.props.disableHover ? this.show : undefined}
          onMouseLeave={!this.props.disableHover ? this.hide : undefined}
          onMouseDown={this.toggleShow}
          onKeyDown={this.closeOnEscape}
          handleOnClick={this.show}
          aria-describedby={`es-tooltip__${this.props.name}`}
        >
          {this.props.children}
        </StyledButton>

        <Overlay
          show={this.state.show}
          placement={this.props.position}
          container={document.body}
          target={props => this.toolTipTarget}
          transition={FadeTransition}
        >
          <Popup position={this.props.position} name={this.props.name}>
            {this.props.content}
          </Popup>
        </Overlay>
      </span>
    );
  }
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
