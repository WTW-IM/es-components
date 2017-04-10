import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../icons/Icon';
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
  children: PropTypes.any.isRequired,
  /** Add additional CSS classes to the drawer item element */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  closedIconName: PropTypes.string,
  /** Header text displayed next to the open/close icon */
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  isActive: PropTypes.bool,
  /** Removes the default padding from the panel body */
  noPadding: PropTypes.bool,
  onItemClick: PropTypes.func,
  openedIconName: PropTypes.string
};

DrawerPanel.defaultProps = {
  isActive: false,
  noPadding: false
};

export default DrawerPanel;
