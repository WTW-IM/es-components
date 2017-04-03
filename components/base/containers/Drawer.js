import React, { PropTypes, Children, Component } from 'react';
import classNames from 'classnames';
import './drawer.less';

function toArray(activeKeys) {
  let currentActiveKeys = activeKeys;
  if (!Array.isArray(currentActiveKeys)) {
    currentActiveKeys = currentActiveKeys ? [currentActiveKeys] : [];
  }
  return currentActiveKeys;
}

class Drawer extends Component {
  constructor(props) {
    super(props);

    const currentActiveKeys = this.props.defaultActiveKeys;
    this.state = {
      activeKeys: toArray(currentActiveKeys)
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKeys' in nextProps) {
      this.setState({
        activeKeys: toArray(nextProps.activeKeys)
      });
    }
  }

  onClickItem(key) {
    return () => {
      let activeKeys = [...this.state.activeKeys];

      if (this.props.isAccordion) {
        activeKeys = activeKeys[0] === key ? [] : [key];
      } else {
        const index = activeKeys.indexOf(key);
        const isActive = index > -1;

        if (isActive) {
          activeKeys.splice(index, 1);
        } else {
          activeKeys.push(key);
        }
      }

      this.setState({ activeKeys });
    };
  }

  getPanels() {
    const activeKeys = this.state.activeKeys;
    const { isAccordion } = this.props;

    return Children.map(this.props.children, (child, index) => {
      // If there is no key provided, use the panel order as default key
      const key = child.key || String(index);
      const header = child.props.header;
      const noPadding = child.props.noPadding || false;

      let isActive = false;
      if (isAccordion) {
        isActive = activeKeys[0] === key;
      } else {
        isActive = activeKeys.indexOf(key) > -1;
      }

      const props = {
        key,
        header,
        noPadding,
        isActive,
        children: child.props.children,
        onItemClick: this.onClickItem(key).bind(this),
        closedIconName: this.props.closedIconName,
        openedIconName: this.props.openedIconName
      };

      return React.cloneElement(child, props);
    });
  }

  render() {
    const { className } = this.props;
    const classes = classNames('drawer', className);

    return (
      <div className={classes}>
        {this.getPanels()}
      </div>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.any,
  /** Add additional CSS classes to the root drawer element */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Override the default plus icon with another OE icon name */
  closedIconName: PropTypes.string,
  /** Specify which panels are opened by default */
  defaultActiveKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** Only allows one DrawerPanel to be open at a time */
  isAccordion: PropTypes.bool,
  /** Override the default minus icon with another OE icon name */
  openedIconName: PropTypes.string
};

Drawer.defaultProps = {
  isAccordion: false,
  closedIconName: 'plus',
  openedIconName: 'minus'
};

export default Drawer;
