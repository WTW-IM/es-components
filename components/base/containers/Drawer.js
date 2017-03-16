import React, { PropTypes, Children, Component } from 'react';
import classNames from 'classnames';
import './drawer.less';

function toArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

class Drawer extends Component {
  constructor(props) {
    super(props);

    const currentActiveKey = this.props.defaultActiveKeys;
    this.state = {
      activeKey: toArray(currentActiveKey)
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: toArray(nextProps.activeKey)
      });
    }
  }

  onClickItem(key) {
    return () => {
      let activeKey = this.state.activeKey;

      if (this.props.isAccordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }

      this.setState({ activeKey });
    };
  }

  getItems() {
    const activeKey = this.state.activeKey;
    const { isAccordion } = this.props;
    const newChildren = [];

    Children.forEach(this.props.children, (child, index) => {
      if (!child) return;
      // If there is no key provided, use the panel order as default key
      const key = child.key || String(index);
      const header = child.props.header;

      let isActive = false;
      if (isAccordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      const props = {
        key,
        header,
        isActive,
        children: child.props.children,
        onItemClick: this.onClickItem(key).bind(this),
        closedIconName: this.props.closedIconName,
        openedIconName: this.props.openedIconName
      };

      newChildren.push(React.cloneElement(child, props));
    });

    return newChildren;
  }

  render() {
    const { className } = this.props;
    const classes = classNames('drawer', className);

    return (
      <div className={classes}>
        {this.getItems()}
      </div>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  closedIconName: PropTypes.string,
  defaultActiveKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  isAccordion: PropTypes.bool,
  openedIconName: PropTypes.string
};

Drawer.defaultProps = {
  closedIconName: 'plus',
  isAccordion: false,
  openedIconName: 'minus'
};

export default Drawer;
