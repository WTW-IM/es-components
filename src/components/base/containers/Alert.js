import React from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';

import Icon from '../icons/Icon';
import './alerts.less';

function renderDismissButton(onDismiss) {
  return (
    <button className="alert__dismiss" aria-label="Close" onClick={onDismiss}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
}

const iconMap = {
  success: 'ok-sign',
  information: 'info-sign',
  warning: 'exclaimation-sign',
  danger: 'exclaimation-sign',
  advisor: 'agent'
};

function renderIcon(type) {
  const iconName = iconMap[type];
  return <Icon className="alert__icon" name={iconName} size={16} />;
}

function renderLeadingHeader(alertType, includeIcon, leadingHeader, leadingText) {
  const hasLeadingHeaderText = leadingHeader !== undefined;
  const hasLeadingText = leadingText !== undefined;

  return (
    <p className="alert__leading-header">
      {includeIcon ? renderIcon(alertType) : null}
      {hasLeadingHeaderText ? <strong>{leadingHeader}<br /></strong> : null}
      {hasLeadingText ? leadingText : null}
    </p>
  );
}

function renderCallsToAction(callsToAction) {
  return (
    <div className="alert__calls-to-action">
      {callsToAction.map((callToAction, index) => {
        const buttonClasses = classNames('btn', {
          ['btn-primary']: index === 0,
          ['btn-default']: index !== 0
        });

        return (
          <button
            key={index}
            className={buttonClasses}
            onClick={callToAction.action}
          >
            {callToAction.actionButtonContent}
          </button>
        );
      })}
    </div>
  );
}

function Alert({
  type,
  header,
  additionalText,
  callsToAction = [],
  children,
  includeIcon = false,
  dismissable = false,
  onDismiss = noop
}) {
  const alertClasses = classNames('alert', `alert__${type}`);
  const hasCallsToAction = callsToAction.length > 0;

  return (
    <div className={alertClasses} role="alert">
      <div className="alert__body">
        {renderLeadingHeader(type, includeIcon, header, additionalText)}
        {children}
      </div>
      {dismissable ? renderDismissButton(onDismiss) : null}
      {hasCallsToAction ? renderCallsToAction(callsToAction) : null}
    </div>
  );
}

const alertTypes = ['success', 'information', 'warning', 'danger', 'advisor'];

const callToActionShape = {
  actionButtonContent: React.PropTypes.node.isRequired,
  /**
   * Function that executes when a button is clicked
   */
  action: React.PropTypes.func.isRequired
};

Alert.propTypes = {
  type: React.PropTypes.oneOf(alertTypes).isRequired,
  /**
   * The bolded text in the leading text
   */
  header: React.PropTypes.string,
  /**
   * The non-bolded text in the leading text
   */
  additionalText: React.PropTypes.string.isRequired,
  /**
   * Additional elements rendered after the leading text
   */
  children: React.PropTypes.element,
  /**
   * Include the corresponding icon in the alert's leading text
   */
  includeIcon: React.PropTypes.bool,
  /**
   * Render a dismiss button
   */
  dismissable: React.PropTypes.bool,
  /**
   * Function to execute when dismiss button is clicked
   */
  onDismiss: React.PropTypes.func,
  callsToAction: React.PropTypes.arrayOf(React.PropTypes.shape(callToActionShape))
};

export default Alert;
