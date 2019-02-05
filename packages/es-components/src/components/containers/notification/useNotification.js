import React, { useRef, useState, useMutationEffect } from 'react';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';

const NotificationIcon = styled(Icon)`
  display: none;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: initial;
    margin-right: 5px;
  }
`;

const DismissButton = styled.button`
  background-color: transparent;
  border: 0;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
`;

const NotificationContent = React.forwardRef(
  (
    { type, includeIcon, isDismissable, onDismiss, children, iconName },
    ref
  ) => {
    const [isDismissed, setIsDismissed] = useState(false);

    useMutationEffect(
      function removeNotification() {
        if (ref.current) {
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
        {includeIcon ? <NotificationIcon name={iconName} size={28} /> : null}
        {children}
        {isDismissable ? (
          <DismissButton
            onClick={dismissNotification}
            className="notification__dismiss"
          >
            <Icon name="remove" size={27} />
          </DismissButton>
        ) : null}
      </>
    );
  }
);

const Notification = styled.div`
  align-items: center;
  background-color: ${props => props.color.bgColor};
  border-radius: 2px;
  color: ${props => props.color.textColor};
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;
  padding: 15px;

  > :not(i):not(button) {
    flex-grow: 1;
  }

  a {
    color: ${props => props.color.textColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .es-popover .es-button--link {
    color: ${props => props.color.textColor};
  }
`;

export function useNotification(styleType = 'base') {
  return function BaseNotification({ role, type, children, ...rest }) {
    const theme = useTheme();
    const notificationRef = useRef(null);
    const color = theme.notificationStyles[type][styleType];
    const iconName = theme.validationIconName[type];
    const notificationContentProps = { iconName, type, ...rest };

    return (
      <Notification ref={notificationRef} role={role} color={color}>
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
