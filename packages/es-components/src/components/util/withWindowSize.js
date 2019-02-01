import React from 'react';
import PropTypes from 'prop-types';

function getWindowSize({ defaultWidth, defaultHeight } = {}) {
  return {
    windowWidth: defaultWidth || document.body.clientWidth,
    windowHeight: defaultHeight || document.body.clientHeight
  };
}

export default function withWindowSize(ComponentClass) {
  class windowSize extends React.Component {
    state = getWindowSize(this.props);

    static propTypes = {
      defaultWidth: PropTypes.number,
      defaultHeight: PropTypes.number
    };

    static defaultProps = {
      defaultWidth: null,
      defaultHeight: null
    };

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => this.setState(getWindowSize());

    render() {
      return (
        <ComponentClass
          {...this.props}
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
        />
      );
    }
  }

  return windowSize;
}
