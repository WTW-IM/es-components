import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';

const NotificationIcon = styled(Icon)`
  align-self: start;
  color: ${props => props.iconColor};
  display: none;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: initial;
    margin-right: 8px;
  }
`;

const DismissButton = styled.button`
  align-self: start;
  background-color: transparent;
  border: 0;
  color: ${props => props.color.textColor};
  cursor: pointer;
  opacity: 0.8;
  padding: 0;
`;

const ContentWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
`;

const NotificationContent = React.forwardRef((props, ref) => {
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
      {isDismissable && (
        <DismissButton onClick={dismissNotification} color={color}>
          <Icon name="remove" size={27} />
        </DismissButton>
      )}
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
