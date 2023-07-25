import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { BaseNotification, BaseNotificationProps } from './BaseNotification';
import {
  ValidationStyleType,
  validationStyleTypes
} from 'es-components-shared-types';

export interface NotificationProps extends BaseNotificationProps {
  type: ValidationStyleType;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  function ForwardedNotification(props, ref) {
    return <BaseNotification ref={ref} {...props} />;
  }
);

Notification.propTypes = {
  /** The type of notification to render */
  type: PropTypes.oneOf<ValidationStyleType>(validationStyleTypes).isRequired,
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
