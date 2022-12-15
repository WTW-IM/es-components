/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import styled, { CSSProperties, DefaultTheme } from 'styled-components';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';
import DismissButton from '../../controls/DismissButton';

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
interface Color {
  textColor: string;
}

interface DismissProps {
  color: Color;
  onClick: () => void;
}

const Dismiss = styled(DismissButton)<DismissProps>`
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

interface NotificationContentProps {
  includeIcon?: boolean;
  isDismissable?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  iconName: string;
  iconColor: string;
  color: Color;
  dismissNotification: () => void;
  alwaysShowIcon?: boolean;
}

export type TypeKeys = keyof DefaultTheme['notificationStyles'];
type StyleTypeKeys = keyof DefaultTheme['notificationStyles']['success'];

interface BaseNotificationProps {
  role?: string;
  type: TypeKeys;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  restyleAnchors?: boolean;
}

function NotificationContent(props: NotificationContentProps) {
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
    onDismiss?.();
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

interface Variant {
  bgColor: string;
  textColor: string;
}

interface NotificationProps {
  restyleAnchors: boolean;
  variant: Variant;
}

const Notification = styled.div<NotificationProps>`
  align-items: center;
  background-color: ${props => props.variant.bgColor};
  border-radius: 2px;
  color: ${props => props.variant.textColor};
  display: flex;
  margin-bottom: 25px;
  padding: 15px;
  border: ${props => props.variant?.borderWidth}
    ${props => props.variant?.borderStyle}
    ${props => props.variant?.borderColor};

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
  }: BaseNotificationProps) {
    const theme = useTheme();
    const color = theme.notificationStyles[type][
      styleType as StyleTypeKeys
    ] as Variant;
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

    return (!isDismissed && (
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
    )) as React.ReactElement;
  };
}
