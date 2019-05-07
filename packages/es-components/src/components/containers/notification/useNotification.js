import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';
import DismissButton from '../../controls/DismissButton';

const NotificationIcon = styled(Icon)`
  align-self: start;
  color: ${props => props.iconColor};
  display: none;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
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
`;

const NotificationContent = React.forwardRef(function NotificationContent(
  props,
  ref
) {
  const {
    includeIcon,
    isDismissable,
    onDismiss,
    children,
    iconName,
    iconColor,
    color
  } = props;
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(
    function removeNotification() {
      if (isDismissed) {
        ref.current.remove();
      }
    },
    [isDismissed]
  );

  function dismissNotification() {
    onDismiss();
    setIsDismissed(true);
  }

  return (
    <>
      {includeIcon && (
        <NotificationIcon name={iconName} iconColor={iconColor} size={28} />
      )}
      <ContentWrapper>{children}</ContentWrapper>
      {isDismissable && <Dismiss onClick={dismissNotification} color={color} />}
    </>
  );
});

const Notification = styled.div`
  align-items: center;
  background-color: ${props => props.variant.bgColor};
  border-radius: 2px;
  color: ${props => props.variant.textColor};
  display: flex;
  margin-bottom: 25px;
  padding: 15px;

  a {
    color: ${props => props.variant.textColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  button[aria-expanded] {
    color: ${props => props.variant.textColor};
  }
`;

export function useNotification(styleType = 'base') {
  return function BaseNotification({ role, type, children, ...rest }) {
    const theme = useTheme();
    const notificationRef = useRef(null);
    const color = theme.notificationStyles[type][styleType];
    const iconName = theme.validationIconName[type];
    const iconColor =
      styleType === 'light' ? theme.colors[type] : theme.colors.white;
    const notificationContentProps = { color, iconName, iconColor, ...rest };

    return (
      <Notification ref={notificationRef} role={role} variant={color}>
        <NotificationContent
          ref={notificationRef}
          {...notificationContentProps}
        >
          {children}
        </NotificationContent>
      </Notification>
    );
  };
}
