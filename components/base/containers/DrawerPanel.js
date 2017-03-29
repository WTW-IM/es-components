import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../icons/icon';
import Collapse from 'react-smooth-collapse-customizable';

const DrawerPanel = (props) => {
  const {
    children,
    className,
    closedIconName,
    header,
    isActive,
    noPadding,
    onItemClick,
    openedIconName
  } = props;
  const panelClasses = classNames('drawer-panel', className);
  const bodyClasses = classNames(
    'drawer-panel__body',
    { 'drawer-panel__body--padded': !noPadding }
  );

  return (
    <div className={panelClasses}>
      <div
        className="drawer-panel__header"
        onClick={() => onItemClick()}
        role="tab"
        aria-expanded={isActive}
      >
        <Icon className="drawer-panel__icon" name={isActive ? openedIconName : closedIconName} />
        {header}
      </div>
      <Collapse expanded={isActive} className={bodyClasses} heightTransition=".35s ease">
        {children}
      </Collapse>
    </div>
  );
};

DrawerPanel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  closedIconName: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  isActive: PropTypes.bool,
  noPadding: PropTypes.bool,
  onItemClick: PropTypes.func,
  openedIconName: PropTypes.string
};

DrawerPanel.defaultProps = {
  isActive: false,
  noPadding: false
};

export default DrawerPanel;
