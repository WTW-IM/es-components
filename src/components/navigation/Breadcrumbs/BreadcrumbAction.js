import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';

class BreadcrumbAction extends React.Component {
  state = { hovering: false };

  render() {
    const hover = () => {
      this.setState({ hovering: true });
    };
    const unhover = () => {
      this.setState({ hovering: false });
    };
    const lineStyle = this.state.hovering ? 'underline' : 'none';
    return (
            <span
              onClick={this.props.Action}
              className={this.props.ActionClasses}
              onMouseOver={hover}
              onMouseOut={unhover}
              style={{ textDecorationLine: lineStyle, color: colors.accent }}
            >
                {this.props.displayName}
            </span>
        );
  }
}

BreadcrumbAction.propTypes = {
  displayName: PropTypes.string,
  Action: PropTypes.func,
  ActionClasses: PropTypes.string
};

export default BreadcrumbAction;
