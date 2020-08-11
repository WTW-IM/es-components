import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { useNotification } from './useNotification';

const DefaultNotification = useNotification();

function Notification(props) {
  return <DefaultNotification {...props} />;
}

Notification.propTypes = {
  /** The type of notification to render */
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'advisor'])
    .isRequired,
  /** Display an icon in the notification on a screen >= 768px */
  includeIcon: PropTypes.bool,
  /** Display a dismiss button that will close the notification */
  isDismissable: PropTypes.bool,
  role: PropTypes.oneOf(['dialog', 'alert']),
  /** Function to execute when the dialog is closed */
  onDismiss: PropTypes.func,
  children: PropTypes.node,
  /** Allows the icon to display at all resolutions */
  alwaysShowIcon: PropTypes.bool
};

Notification.defaultProps = {
  includeIcon: false,
  isDismissable: false,
  children: null,
  role: 'dialog',
  onDismiss: noop,
  alwaysShowIcon: false
};

export default Notification;
