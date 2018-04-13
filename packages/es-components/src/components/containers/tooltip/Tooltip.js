import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import styled, { ThemeProvider, withTheme } from 'styled-components';

import defaultTheme from '../../theme/defaultTheme';
import Fade from '../../util/Fade';

const TooltipBase = styled.div`
  position: absolute;
`;

const TooltipInner = styled.div`
  background-color: ${props => props.theme.colors.black};
  border-radius: 2px;
  color: ${props => props.theme.colors.white};
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
  border-top-color: ${props => props.theme.colors.black};
  border-width: 5px 5px 0;
  bottom: 0;
  left: 50%;
  margin-left: -5px;
`;

const TooltipArrowRight = styled(TooltipArrowBase)`
  border-right-color: ${props => props.theme.colors.black};
  border-width: 5px 5px 5px 0;
  left: 0;
  margin-top: -5px;
  top: 50%;
`;

const TooltipArrowBottom = styled(TooltipArrowBase)`
  border-bottom-color: ${props => props.theme.colors.black};
  border-width: 0 5px 5px;
  left: 50%;
  margin-left: -5px;
  top: 0;
`;

const TooltipArrowLeft = styled(TooltipArrowBase)`
  border-left-color: ${props => props.theme.colors.black};
  border-width: 5px 0 5px 5px;
  margin-top: -5px;
  right: 0;
  top: 50%;
`;

const FadeTransition = props => (
  <Fade duration={200} opacity={0.9} withWrapper {...props} />
);

const Popup = props => {
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
    <TooltipStyled role="tooltip" className={className} style={style}>
      <TooltipArrow />
      <TooltipInner>{children}</TooltipInner>
    </TooltipStyled>
  );
};

Popup.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  style: PropTypes.object
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  show = () => this.setState({ show: true });

  hide = () => this.setState({ show: false });

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <span>
          <span
            ref={span => {
              this.toolTipTarget = span;
            }}
            onMouseEnter={this.show}
            onMouseLeave={this.hide}
          >
            {this.props.children}
          </span>

          <Overlay
            show={this.state.show}
            placement={this.props.position}
            container={document.body}
            target={props => this.toolTipTarget}
            transition={FadeTransition}
          >
            <Popup position={this.props.position}>{this.props.content}</Popup>
          </Overlay>
        </span>
      </ThemeProvider>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.any.isRequired,
  /** The text the tooltip displays */
  content: PropTypes.node.isRequired,
  /** Set the position of the tooltip over the content */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

Tooltip.defaultProps = {
  position: 'top',
  theme: defaultTheme
};

export default withTheme(Tooltip);
