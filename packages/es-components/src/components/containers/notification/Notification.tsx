import React from 'react';
import PropTypes from 'prop-types';
import noop from '../../util/noop';
import { BaseNotification, BaseNotificationProps } from './BaseNotification';
import {
  ValidationStyleType,
  validationStyleTypes
} from 'es-components-shared-types';

export interface NotificationProps extends BaseNotificationProps {
  type: ValidationStyleType;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  function ForwardedNotification(
    {
      includeIcon = false,
      isDismissable = false,
      onDismiss = noop,
      alwaysShowIcon = false,
      ...props
    },
    ref
  ) {
    return (
      <BaseNotification
        ref={ref}
        {...{
          includeIcon,
          isDismissable,
          onDismiss,
          alwaysShowIcon,
          ...props
        }}
      />
    );
  }
);

Notification.propTypes = {
  /** The type of notification to render */
  type: PropTypes.oneOf<ValidationStyleType>(validationStyleTypes).isRequired,
  /** Display an icon in the notification on a screen >= 768px */
  includeIcon: PropTypes.bool,
  /** Display a dismiss button that will close the notification */
  isDismissable: PropTypes.bool,
  /** Function to execute when the dialog is closed */
  onDismiss: PropTypes.func,
  /** Allows the icon to display at all resolutions */
  alwaysShowIcon: PropTypes.bool
};

export default Notification;
