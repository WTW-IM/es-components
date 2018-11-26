/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import DismissButton from '../../controls/DismissButton';
import { useTheme } from '../../util/useTheme';

const DismissNotification = styled(DismissButton)`
  line-height: 80%;
  opacity: 0.2;
  padding: 0;
  margin-left: 15px;
  text-shadow: 0 1px 0 ${props => props.theme.colors.white};

  &:hover {
    opacity: 0.5;
  }
`;

const iconMap = {
  success: 'ok-circle',
  info: 'info-circle',
  warning: 'exclamation-sign',
  danger: 'info-circle',
  advisor: 'agent'
};

const NotificationIcon = styled(Icon)`
  margin-right: 5px;
  margin-top: 2px;

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    display: none;
  }
`;

function renderIcon(type) {
  const iconName = iconMap[type];
  return <NotificationIcon name={iconName} />;
}

const LeadingHeader = styled.div`
  display: flex;
  flex-grow: 2;
`;

const StrongHeader = styled.h4`
  padding-bottom: 0.25em;
  margin: 0;
`;

const renderLeadingHeader = (
  notificationType,
  includeIcon,
  leadingHeader,
  leadingText
) => (
  <LeadingHeader>
    {includeIcon && renderIcon(notificationType)}
    <div>
      {leadingHeader && <StrongHeader>{leadingHeader}</StrongHeader>}
      {leadingText && <div>{leadingText}</div>}
    </div>
  </LeadingHeader>
);

const ExtraAlert = styled.aside`
  max-width: 250px;
  text-align: right;
  line-height: 95%;
`;

const ExtraAlertIcon = styled(Icon)`
  margin-right: 7px;
  margin-bottom: 4px;

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    display: none;
  }
`;

function renderExtraAlert(alert) {
  const { alertText, alertIcon = 'federal' } = alert;

  return (
    <ExtraAlert className="extra__alert">
      <ExtraAlertIcon name={alertIcon} />
      <small>{alertText}</small>
    </ExtraAlert>
  );
}

/**
 * The selector on the buttons is to ensure that the primary button does not
 * get a margin. Because the flex-direction is row-reverse, it has to be a weird looking
 * inverse that kind of goes against normal thinking
 */
const CallsToAction = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 12px;

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    display: block;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: 15px;

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    width: 100%;
    margin: 12px 0 0 0;

    & > button {
      width: 100%;
    }
  }
`;

function renderCallsToAction(callsToAction) {
  return (
    <CallsToAction className="es-notification__actions">
      {callsToAction.map((callToAction, index) => {
        const buttonStyleType = index === 0 ? 'primary' : 'default';

        if (React.isValidElement(callToAction)) {
          return (
            <ButtonWrapper key={index}>
              {React.cloneElement(callToAction, {
                styleType: buttonStyleType
              })}
            </ButtonWrapper>
          );
        }

        return (
          <ButtonWrapper key={index}>
            <Button
              styleType={buttonStyleType}
              handleOnClick={callToAction.action}
            >
              {callToAction.actionButtonContent}
            </Button>
          </ButtonWrapper>
        );
      })}
    </CallsToAction>
  );
}

const NotificationWrapper = styled.div`
  margin-bottom: 25px;
`;

const NotificationBgWrapper = styled.div`
  background-color: ${props => props.color.bgColor};
  border-radius: 2px;
  color: ${props => props.color.textColor};
  padding: 15px;

  a {
    color: ${props => props.color.textColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .es-popover {
    .es-button--link {
      color: ${props => props.color.textColor};
    }
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${props => (props.hasChildren ? '15px' : '0')};
`;

const NotificationContent = styled.div`
  margin-left: ${props => (props.hasIcon ? '24px' : '0')};

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    margin-left: 0;
  }
`;

function Notification({
  type,
  header,
  additionalText,
  callsToAction,
  children,
  includeIcon,
  dismissable,
  isAlert,
  onDismiss,
  extraAlert,
  useLightVariant,
  useMessageOnlyVariant,
  ...otherProps
}) {
  const theme = useTheme();
  const hasCallsToAction = callsToAction.length > 0;
  const roleType = isAlert ? 'alert' : 'dialog';
  let bgType = 'base';
  if (useMessageOnlyVariant) {
    bgType = 'messageOnly';
  } else if (useLightVariant) {
    bgType = 'light';
  }

  return (
    <NotificationWrapper className="es-notification__wrapper" role={roleType}>
      <NotificationBgWrapper
        {...otherProps}
        color={theme.notificationStyles[type][bgType]}
      >
        <NotificationHeader className="es-notification__header">
          {renderLeadingHeader(type, includeIcon, header, additionalText)}
          {extraAlert && renderExtraAlert(extraAlert)}
          {dismissable && (
            <DismissNotification
              onClick={onDismiss}
              className="notification__dismiss"
            />
          )}
        </NotificationHeader>

        {children && (
          <NotificationContent
            className="es-notification__content"
            hasIcon={includeIcon}
          >
            {children}
          </NotificationContent>
        )}
      </NotificationBgWrapper>
      {hasCallsToAction && renderCallsToAction(callsToAction)}
    </NotificationWrapper>
  );
}

const notificationTypes = ['success', 'info', 'warning', 'danger', 'advisor'];

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
  /** Display a set of buttons for the user. A custom element or an object describing the button content and action are acceptable. */
  callsToAction: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(callToActionShape), PropTypes.element])
  ),
  /** Use the light color variants of the alert */
  useLightVariant: PropTypes.bool,
  /** Display only the message without a colored background */
  useMessageOnlyVariant: PropTypes.bool
};

Notification.defaultProps = {
  header: undefined,
  additionalText: undefined,
  children: undefined,
  includeIcon: false,
  dismissable: false,
  isAlert: false,
  onDismiss: noop,
  extraAlert: undefined,
  callsToAction: [],
  useLightVariant: false,
  useMessageOnlyVariant: false
};

export default Notification;
