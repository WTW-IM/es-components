import React, { AriaRole, useState } from 'react';
import type * as CSS from 'csstype';
import styled, { CSSProperties } from 'styled-components';
import type {
  NotificationStyleBlock,
  ValidationStyleType,
  NotificationStyleType,
  IconName,
  ColorName
} from 'es-components-shared-types';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';
import DismissButton, {
  DismissButtonProps
} from '../../controls/DismissButton';

const NotificationIcon = styled(Icon)<{ alwaysShowIcon: boolean }>`
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
  textColor: CSS.Property.Color;
}

interface DismissProps extends Omit<DismissButtonProps, 'color'> {
  color: Color;
}

const DismissBtn = styled(DismissButton)<DismissProps>`
  align-self: start;
  color: ${props => props.color.textColor};
  font-weight: normal;
  opacity: 0.8;
  i {
    font-size: 27px;
  }
` as React.FC<DismissProps>;

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
  iconName: IconName;
  iconColor: string;
  color: Color;
  dismissNotification: () => void;
  alwaysShowIcon?: boolean;
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
          alwaysShowIcon={Boolean(alwaysShowIcon)}
        />
      )}
      <ContentWrapper {...rest}>{children}</ContentWrapper>
      {isDismissable && <DismissBtn onClick={dismiss} color={color} />}
    </>
  );
}

const Notification = styled.div<{
  restyleAnchors: boolean;
  variant: NotificationStyleBlock;
}>`
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

interface BaseNotificationProps {
  role?: AriaRole;
  type: ValidationStyleType;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  restyleAnchors?: boolean;
  styleType?: NotificationStyleType;
}

export function BaseNotification({
  role = 'dialog',
  type,
  children,
  className,
  style,
  restyleAnchors = true,
  styleType = 'base' as NotificationStyleType,
  ...rest
}: BaseNotificationProps) {
  const theme = useTheme();
  const color = theme.notificationStyles[type][styleType];
  const iconName = theme.validationIconName[type];
  const iconColor =
    styleType === 'base' ? theme.colors.white : theme.colors[type as ColorName];
  const notificationContentProps = {
    color,
    iconName,
    iconColor,
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
      role={role}
    >
      <NotificationContent
        dismissNotification={dismissNotification}
        {...notificationContentProps}
      >
        {children}
      </NotificationContent>
    </Notification>
  )) as React.ReactElement;
}
