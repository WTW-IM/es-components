import React, { AriaRole, useState } from 'react';
import type * as CSS from 'csstype';
import styled, { CSSProperties, css } from 'styled-components';
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

const NotificationIcon = styled(Icon)<{
  alwaysShowIcon: boolean;
  iconColor: CSS.Property.Color;
}>`
  ${({ iconColor, theme, alwaysShowIcon }) => css`
    align-self: start;
    color: ${iconColor};
    display: none;

    @media (min-width: ${alwaysShowIcon ? 0 : theme.screenSize.tablet}) {
      display: inline;
      margin-right: 8px;
    }
  `}
`;
interface Color {
  textColor: CSS.Property.Color;
}

type DismissProps = Override<
  DismissButtonProps,
  {
    color: Color;
  }
>;

const DismissBtn = styled(DismissButton).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['color'].includes(prop) && defaultValidatorFn(prop)
})<DismissProps>`
  ${({ color }) => css`
    align-self: start;
    color: ${color};
    font-weight: normal;
    opacity: 0.8;
    i {
      font-size: 27px;
    }
  `}
`;

const ContentWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
  word-break: break-word;
`;

interface NotificationContentProps
  extends Omit<JSXElementProps<'div'>, 'color'> {
  includeIcon?: boolean;
  isDismissable?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  iconName: IconName;
  iconColor: string;
  color: Color;
  dismissNotification: () => void;
  alwaysShowIcon?: boolean;
}

export interface BaseNotificationProps
  extends Omit<
    NotificationContentProps,
    'dismissNotification' | 'color' | 'iconName' | 'iconColor'
  > {
  role?: AriaRole;
  type: ValidationStyleType;
  className?: string;
  style?: CSSProperties;
  restyleAnchors?: boolean;
  styleType?: NotificationStyleType;
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
      {isDismissable && (
        <DismissBtn onClick={dismiss} color={color as string & Color} />
      )}
    </>
  );
}

const Notification = styled.div<{
  restyleAnchors: boolean;
  variant: NotificationStyleBlock;
}>`
  ${({ variant, restyleAnchors }) =>
    css`
      align-items: center;
      background-color: ${variant.bgColor};
      border-radius: 2px;
      color: ${variant.textColor};
      display: flex;
      margin-bottom: 25px;
      padding: 15px;
      border: ${variant.borderWidth} ${variant.borderStyle}
        ${variant.borderColor};

      ${restyleAnchors
        ? css`
            a {
              color: ${variant.textColor};
              text-decoration: underline;

              &:hover {
                text-decoration: none;
              }
            }
          `
        : ``}

      button[aria-expanded] {
        color: ${variant.textColor};
      }
    `}
`;

export const BaseNotification = React.forwardRef<
  HTMLDivElement,
  BaseNotificationProps
>(function ForwardedBaseNotification(
  {
    role = 'dialog',
    type,
    children,
    className,
    style,
    restyleAnchors = true,
    styleType = 'base',
    ...rest
  },
  ref
) {
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
      ref={ref}
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
});
