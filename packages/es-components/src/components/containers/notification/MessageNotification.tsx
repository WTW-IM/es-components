import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { BaseNotification, BaseNotificationProps } from './BaseNotification';
import { validationStyleTypes } from 'es-components-shared-types';

const MessageNotification = React.forwardRef<
  HTMLDivElement,
  BaseNotificationProps
>(function ForwardedMessageNotification(props, ref) {
  return <BaseNotification ref={ref} {...props} styleType="messageOnly" />;
});

MessageNotification.propTypes = {
  /** The type of notification to render */
  type: PropTypes.oneOf(validationStyleTypes).isRequired,
  /** Display an icon in the notification on a screen >= 768px */
  includeIcon: PropTypes.bool,
  /** Display a dismiss button that will close the notification */
  isDismissable: PropTypes.bool,
  /** Function to execute when the dialog is closed */
  onDismiss: PropTypes.func,
  /** Allows the icon to display at all resolutions */
  alwaysShowIcon: PropTypes.bool
};

MessageNotification.defaultProps = {
  includeIcon: false,
  isDismissable: false,
  onDismiss: noop,
  alwaysShowIcon: false
};

export default MessageNotification;
