import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';

import { alertVariations } from './alert-variations';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import { colors } from '../../theme';

const DismissButton = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 27px;
  font-weight: bold;
  opacity: 0.2;
  text-shadow: 0 1px 0 ${colors.white};
`;

function renderDismissButton(onDismiss) {
  return (
    <DismissButton
      aria-label="Close"
      onClick={onDismiss}
      className="alert__dismiss"
    >
      <span aria-hidden="true">×</span>
    </DismissButton>
  );
}

const iconMap = {
  success: 'ok-sign',
  information: 'info-sign',
  warning: 'exclamation-sign',
  danger: 'exclamation-sign',
  advisor: 'agent'
};

const AlertIcon = styled(Icon)`
  margin-right: 5px;
  margin-bottom: 2px;

  @media (max-width: 767px) {
    display: none;
  }
`;

function renderIcon(type) {
  const iconName = iconMap[type];
  return <AlertIcon name={iconName} />;
}

const LeadingHeader = styled.p`
  margin: 0;
  padding: 15px;
`;

const LeadingText = styled.span`
  margin-left: ${props => (props.adjustText ? '24px' : '0')};
`;

function renderLeadingHeader(
  alertType,
  includeIcon,
  leadingHeader,
  leadingText
) {
  const hasLeadingHeaderText = leadingHeader !== undefined;
  const hasLeadingText = leadingText !== undefined;
  const adjustText = hasLeadingHeaderText && includeIcon;

  return (
    <LeadingHeader>
      {includeIcon ? renderIcon(alertType) : null}
      {hasLeadingHeaderText ? <strong>{leadingHeader}<br /></strong> : null}
      {hasLeadingText
        ? <LeadingText adjustText={adjustText}>{leadingText}</LeadingText>
        : null}
    </LeadingHeader>
  );
}

const ExtraNotification = styled.p`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 15px;
`;

const NotificationIcon = styled(Icon)`
  margin-right: 7px;
  margin-bottom: 2px;

  @media (max-width: 767px) {
    display: none;
  }
`;

function renderExtraNotification(notification) {
  const { notificationText, notificationIcon = 'federal' } = notification;

  return (
    <ExtraNotification className="alert__notification">
      <NotificationIcon name={notificationIcon} />
      <small>{notificationText}</small>
    </ExtraNotification>
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

const AlertContainer = styled.div`
   background-color: ${props => props.alertVariation.color};
   border: 1px solid ${props => props.alertVariation.borderColor};
   border-radius: 2px;
   color: ${props => props.alertVariation.foregroundColor};
   margin-bottom: 25px;
`;

const AlertContent = styled.div`
  padding: 0 15px 15px;
  margin-left: ${props => (props.hasIcon ? '24px' : '0')};
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AlertHeaderText = styled.div`
  display: flex;
`;

function Alert({
  type,
  header,
  additionalText,
  callsToAction = [],
  children,
  includeIcon = false,
  dismissable = false,
  onDismiss = noop,
  extraNotification,
  ...otherProps
}) {
  const alertVariation = alertVariations[type];
  const hasCallsToAction = callsToAction.length > 0;
  const hasExtraNotification = extraNotification;
  const hasChildren = React.Children.count(children) > 0;

  return (
    <AlertContainer
      {...otherProps}
      alertVariation={alertVariation}
      role="alert"
    >
      <AlertHeader>
        {renderLeadingHeader(type, includeIcon, header, additionalText)}
        <AlertHeaderText>
          {hasExtraNotification
            ? renderExtraNotification(extraNotification)
            : null}
          {dismissable ? renderDismissButton(onDismiss) : null}
        </AlertHeaderText>
      </AlertHeader>

      {hasChildren
        ? <AlertContent hasIcon={includeIcon}>{children}</AlertContent>
        : null}
      {hasCallsToAction ? renderCallsToAction(callsToAction) : null}
    </AlertContainer>
  );
}

const alertTypes = ['success', 'information', 'warning', 'danger', 'advisor'];

const callToActionShape = {
  actionButtonContent: PropTypes.node.isRequired,
  /** Function that executes when a button is clicked */
  action: PropTypes.func.isRequired
};

const extraNotificationShape = {
  notificationText: PropTypes.node.isRequired,
  notificationIcon: PropTypes.string
};

Alert.propTypes = {
  type: PropTypes.oneOf(alertTypes).isRequired,
  /** The bolded text in the leading text */
  header: PropTypes.string,
  /** The non-bolded text in the leading text */
  additionalText: PropTypes.string,
  /** Additional elements rendered after the leading text */
  children: PropTypes.node,
  /** Include the corresponding icon in the alert's leading text */
  includeIcon: PropTypes.bool,
  /** Render a dismiss button */
  dismissable: PropTypes.bool,
  /** Function to execute when dismiss button is clicked */
  onDismiss: PropTypes.func,
  /** The small text and icon included in the extra notification */
  extraNotification: PropTypes.shape(extraNotificationShape),
  callsToAction: PropTypes.arrayOf(PropTypes.shape(callToActionShape))
};

export default Alert;
