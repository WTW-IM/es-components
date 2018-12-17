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

const iconNames = {
  success: 'ok-circle',
  info: 'info-circle',
  warning: 'exclamation-sign',
  danger: 'info-circle',
  advisor: 'agent'
};

const NotificationContent = React.forwardRef(
  ({ type, includeIcon, isDismissable, onDismiss, children }, ref) => {
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
        {includeIcon ? (
          <NotificationIcon name={iconNames[type]} size={28} />
        ) : null}
        {children}
        {isDismissable ? (
          <DismissButton onClick={dismissNotification}>
            <Icon name="remove" size={27} />
          </DismissButton>
        ) : null}
      </>
    );
  }
);

const Notification = styled.div`
  align-items: center;
  background-color: ${props => props.variant.bgColor};
  border-radius: 2px;
  color: ${props => props.variant.textColor};
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;
  padding: 15px;

  > :not(i):not(button) {
    flex-grow: 1;
  }

  a {
    color: ${props => props.variant.textColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .es-popover .es-button--link {
    color: ${props => props.variant.textColor};
  }
`;

export function useNotification(styleType = 'base') {
  return function BaseNotification({ role, type, children, ...rest }) {
    const theme = useTheme();
    const notificationRef = useRef(null);
    const variant = theme.notificationStyles[type][styleType];

    const notificationContentProps = { type, ...rest };

    return (
      <Notification ref={notificationRef} role={role} variant={variant}>
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
