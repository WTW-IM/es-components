/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';
import DismissButton from '../../controls/DismissButton';
import getStyledProp from '../../util/getStyledProp';

const NotificationIcon = styled(Icon)`
  align-self: start;
  color: ${props => props.iconColor};
  display: none;
  @media (min-width: ${props =>
      props.alwaysShowIcon ? 0 : props.theme.screenSize.tablet}) {
    display: inline;
    margin-right: 8px;
  }
`;

const Dismiss = styled(DismissButton)`
  align-self: start;
  color: ${props => props.color.textColor};
  font-weight: normal;
  opacity: 0.8;
  i {
    font-size: 27px;
  }
`;

const ContentWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
  word-break: break-word;
`;

function NotificationContent(props) {
  const {
    includeIcon,
    isDismissable,
    onDismiss,
    children,
    iconName,
    iconColor,
    color,
    dismissNotification,
    alwaysShowIcon,
    ...rest
  } = props;

  function dismiss() {
    onDismiss();
    dismissNotification();
  }

  return (
    <>
      {includeIcon && (
        <NotificationIcon
          name={iconName}
          iconColor={iconColor}
          size={28}
          alwaysShowIcon={alwaysShowIcon}
        />
      )}
      <ContentWrapper {...rest}>{children}</ContentWrapper>
      {isDismissable && <Dismiss onClick={dismiss} color={color} />}
    </>
  );
}

const Notification = styled.div`
  align-items: center;
  background-color: ${props => props.variant.bgColor};
  border-radius: 2px;
  color: ${props => props.variant.textColor};
  display: flex;
  margin-bottom: 25px;
  padding: 15px;
  border: ${props => getStyledProp('inputStyles.borderHeight')(props) || '0px'}
    solid ${props => props.variant.borderColor};

  ${props =>
    props.restyleAnchors
      ? `
    a {
      color: ${props.variant.textColor};
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  `
      : ``}

  button[aria-expanded] {
    color: ${props => props.variant.textColor};
  }
`;

export function useNotification(styleType = 'base') {
  return function BaseNotification({
    role,
    type,
    children,
    className,
    style,
    restyleAnchors = true,
    ...rest
  }) {
    const theme = useTheme();
    const color = theme.notificationStyles[type][styleType];
    const iconName = theme.validationIconName[type];
    const iconColor =
      styleType === 'base' ? theme.colors.white : theme.colors[type];
    const notificationContentProps = {
      color,
      iconName,
      iconColor,
      role,
      ...rest
    };
    const [isDismissed, setIsDismissed] = useState(false);

    function dismissNotification() {
      setIsDismissed(true);
    }

    return (
      !isDismissed && (
        <Notification
          variant={color}
          className={className}
          style={style}
          restyleAnchors={restyleAnchors}
        >
          <NotificationContent
            dismissNotification={dismissNotification}
            {...notificationContentProps}
          >
            {children}
          </NotificationContent>
        </Notification>
      )
    );
  };
}
