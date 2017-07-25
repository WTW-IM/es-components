import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';

import { notificationVariations } from './notification-variations';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import DismissButton from '../../controls/DismissButton';
import { colors } from '../../theme';

const DismissNotification = styled(DismissButton)`
  line-height: 1.4;
  opacity: 0.2;
  padding: 6px 12px;
  text-shadow: 0 1px 0 ${colors.white};

  &:hover {
    opacity: 0.5;
  }
`;

const iconMap = {
  success: 'ok-sign',
  information: 'info-sign',
  warning: 'exclamation-sign',
  danger: 'exclamation-sign',
  advisor: 'agent'
};

const NotificationIcon = styled(Icon)`
  margin-right: 5px;
  margin-bottom: 2px;

  @media (max-width: 767px) {
    display: none;
  }
`;

function renderIcon(type) {
  const iconName = iconMap[type];
  return <NotificationIcon name={iconName} />;
}

const LeadingHeader = styled.div`
  display: flex;
  margin: 0;
  padding: 15px;
`;

const StrongHeader = styled.h4`
  display: block;
  padding-bottom: .25em;
  margin: 0;
`;

function renderLeadingHeader(
  notificationType,
  includeIcon,
  leadingHeader,
  leadingText
) {
  const hasLeadingHeaderText = leadingHeader !== undefined;
  const hasLeadingText = leadingText !== undefined;

  return (
    <LeadingHeader>
      {includeIcon && renderIcon(notificationType)}
      <div>
        {hasLeadingHeaderText &&
          <StrongHeader>
            {leadingHeader}
          </StrongHeader>}
        {hasLeadingText &&
          <div>
            {leadingText}
          </div>}
      </div>
    </LeadingHeader>
  );
}

const ExtraAlert = styled.aside`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 15px;
`;

const ExtraAlertIcon = styled(Icon)`
  margin-right: 7px;
  margin-bottom: 2px;

  @media (max-width: 767px) {
    display: none;
  }
`;

function renderExtraAlert(alert) {
  const { alertText, alertIcon = 'federal' } = alert;

  return (
    <ExtraAlert className="extra__alert">
      <ExtraAlertIcon name={alertIcon} />
      <small>
        {alertText}
      </small>
    </ExtraAlert>
  );
}

/**
 * The selector on the buttons is to ensure that the primary button does not
 * get a margin. Because the flex-direction is row-reverse, it has to be a weird looking
 * inverse that kind of goes against normal thinking
 */
const CallsToAction = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row-reverse;
  padding: 0 15px 15px 0;

  & > button:not(:first-of-type) {
    margin-right: 15px;
  }

  @media (max-width: 767px) {
    display: block;
    padding: 15px;

    & > button {
      display: block;
      margin-bottom: 15px;
      width: 100%;

      &:active {
        margin-bottom: 15px;
      }
    }
  }
`;

function renderCallsToAction(callsToAction) {
  return (
    <CallsToAction>
      {callsToAction.map((callToAction, index) => {
        const buttonStyleType = index === 0 ? 'primary' : 'default';

        return (
          <Button
            styleType={buttonStyleType}
            key={index}
            handleOnClick={callToAction.action}
          >
            {callToAction.actionButtonContent}
          </Button>
        );
      })}
    </CallsToAction>
  );
}

const NotificationContainer = styled.div`
  background-color: ${props => props.notificationVariation.color};
  border: 1px solid ${props => props.notificationVariation.borderColor};
  border-radius: 2px;
  color: ${props => props.notificationVariation.foregroundColor};
  margin-bottom: 25px;
`;

const NotificationContent = styled.div`
  padding: 0 15px 15px;
  margin-left: ${props => (props.hasIcon ? '24px' : '0')};

  @media (max-width: 767px) {
    margin-left: 0;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Notification({
  type,
  header,
  additionalText,
  callsToAction = [],
  children,
  includeIcon = false,
  dismissable = false,
  isAlert = false,
  onDismiss = noop,
  extraAlert,
  ...otherProps
}) {
  const notificationVariation = notificationVariations[type];
  const hasCallsToAction = callsToAction.length > 0;
  const hasExtraAlert = extraAlert;
  const hasChildren = React.Children.count(children) > 0;
  const roleType = isAlert ? 'alert' : 'dialog';

  return (
    <NotificationContainer
      {...otherProps}
      notificationVariation={notificationVariation}
      role={roleType}
    >
      <NotificationHeader>
        {renderLeadingHeader(type, includeIcon, header, additionalText)}
        <div>
          {hasExtraAlert && renderExtraAlert(extraAlert)}
          {dismissable &&
            <DismissNotification
              onClick={onDismiss}
              className="notification__dismiss"
            />}
        </div>
      </NotificationHeader>

      {hasChildren &&
        <NotificationContent hasIcon={includeIcon}>
          {children}
        </NotificationContent>}
      {hasCallsToAction && renderCallsToAction(callsToAction)}
    </NotificationContainer>
  );
}

const notificationTypes = [
  'success',
  'information',
  'warning',
  'danger',
  'advisor'
];

const callToActionShape = {
  actionButtonContent: PropTypes.node.isRequired,
  /** Function that executes when a button is clicked */
  action: PropTypes.func.isRequired
};

const extraAlertShape = {
  alertText: PropTypes.node.isRequired,
  alertIcon: PropTypes.string
};

Notification.propTypes = {
  type: PropTypes.oneOf(notificationTypes).isRequired,
  /** The bolded text in the leading text */
  header: PropTypes.string,
  /** The non-bolded text in the leading text */
  additionalText: PropTypes.string,
  /** Additional elements rendered after the leading text */
  children: PropTypes.node,
  /** Include the corresponding icon in the notification's leading text */
  includeIcon: PropTypes.bool,
  /** Render a dismiss button */
  dismissable: PropTypes.bool,
  /** Makes the Notification act as an alert for screen-reader accessibility */
  isAlert: PropTypes.bool,
  /** Function to execute when dismiss button is clicked */
  onDismiss: PropTypes.func,
  /** The small text and icon included in the extra notification */
  extraAlert: PropTypes.shape(extraAlertShape),
  callsToAction: PropTypes.arrayOf(PropTypes.shape(callToActionShape))
};

export default Notification;
