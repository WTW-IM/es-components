import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import cssAnimation from 'css-animation';
import Icon from '../icons/icon';

function animate(node, show, done) {
  let height;
  const animNode = node;
  return cssAnimation(node, 'drawer--animate', {
    start() {
      if (!show) {
        animNode.style.height = `${animNode.offsetHeight}px`;
      } else {
        height = animNode.offsetHeight;
        animNode.style.height = 0;
      }
    },
    active() {
      animNode.style.height = `${show ? height : 0}px`;
    },
    end() {
      animNode.style.height = '';
      done();
    }
  });
}

function animation() {
  return {
    enter(node, done) {
      return animate(node, true, done);
    },
    leave(node, done) {
      return animate(node, false, done);
    }
  };
}

class PanelContent extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isActive || nextProps.isActive;
  }

  render() {
    this._isActivated = this._isActivated || this.props.isActive;
    if (!this._isActivated) {
      return null;
    }

    const { isActive, children } = this.props;
    const contentCls = classNames({
      'drawer-panel-body': true,
      'drawer-panel-body--active': isActive,
      'drawer-panel-body--inactive': !isActive
    });

    return (
      <div className={contentCls} role="tabpanel">
        {isActive ? <div className={'drawer-panel-content'}>{children}</div> : null}
      </div>
    );
  }
}

PanelContent.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.any
};

const DrawerPanel = (props) => {
  const { className,
    header,
    children,
    isActive,
    openedIconName,
    closedIconName,
    onItemClick } = props;
  const classes = classNames('drawer-panel', className);

  return (
    <div className={classes}>
      <div
        className="drawer-panel-header"
        onClick={() => onItemClick()}
        role="tab"
        aria-expanded={isActive}
      >
        <Icon className="drawer-panel-icon" name={isActive ? openedIconName : closedIconName} />
        {header}
      </div>
      <Animate showProp="isActive" exclusive component="" animation={animation()}>
        <PanelContent isActive={isActive}>
          {children}
        </PanelContent>
      </Animate>
    </div>
  );
};

DrawerPanel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func,
  openedIconName: PropTypes.string,
  closedIconName: PropTypes.string
};

DrawerPanel.defaultProps = {
  isActive: false
};

export default DrawerPanel;
