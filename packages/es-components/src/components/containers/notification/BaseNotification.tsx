import React, { AriaRole, useState } from 'react';
import type * as CSS from 'csstype';
import styled, { CSSProperties, css } from 'styled-components';
import type {
  NotificationStyleBlock,
  ValidationStyleType,
  NotificationStyleType,
  IconName
} from 'es-components-shared-types';
import Icon from '../../base/icons/Icon';
import { useTheme } from '../../util/useTheme';
import DismissButton, {
  DismissButtonProps
} from '../../controls/DismissButton';

const NotificationIcon = styled(Icon)<{
  $alwaysShowIcon: boolean;
  $iconColor: CSS.Property.Color;
}>`
  ${({ $iconColor, theme, $alwaysShowIcon }) => css`
    display: none;
    align-self: start;
    color: ${$iconColor};

    @media (min-width: ${$alwaysShowIcon ? 0 : theme.screenSize.tablet}) {
      display: inline;
      margin-right: 8px;
    }
  `}
`;

type DismissProps = Override<
  DismissButtonProps,
  {
    color: CSS.Property.Color;
  }
>;

const DismissBtn = styled(DismissButton).withConfig({
  shouldForwardProp: prop => !['color'].includes(prop)
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
  flex-grow: 1;
  align-self: center;
  word-break: break-word;
`;

interface NotificationContentProps
  extends Omit<JSXElementProps<'div'>, 'color'> {
  includeIcon?: boolean;
  isDismissable?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  iconName?: IconName;
  iconColor: string;
  color: CSS.Property.Color;
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
          $iconColor={iconColor}
          size={28}
          $alwaysShowIcon={Boolean(alwaysShowIcon)}
        />
      )}
      <ContentWrapper {...rest}>{children}</ContentWrapper>
      {isDismissable && <DismissBtn onClick={dismiss} color={color} />}
    </>
  );
}

const Notification = styled.div<{
  $restyleAnchors: boolean;
  $variant: NotificationStyleBlock;
}>`
  ${({ $variant, $restyleAnchors }) => css`
    align-items: center;
    background-color: ${$variant.bgColor};
    border-radius: 2px;
    color: ${$variant.textColor};
    display: flex;
    margin-bottom: 25px;
    padding: 15px;
    border: ${$variant.borderWidth} ${$variant.borderStyle}
      ${$variant.borderColor};

    ${$restyleAnchors
      ? css`
          && a {
            color: ${$variant.textColor};
            text-decoration: underline;

            &:hover,
            &:focus,
            &:active {
              text-decoration: none;
            }
          }
        `
      : ``}

    button[aria-expanded] {
      color: ${$variant.textColor};
    }
  `}
`;

const textWhite = '#fff';

const defaultColorVariant = {
  bgColor: '#006699',
  textColor: textWhite
};

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
  const colorVariant =
    theme?.notificationStyles[type][styleType] ?? defaultColorVariant;
  const color = colorVariant.textColor;
  const iconName = theme?.validationIconName[type];
  const iconColor =
    (styleType === 'base' || type === 'default'
      ? theme?.colors.white
      : theme?.colors[type]) ?? textWhite;
  const notificationContentProps = {
    ...rest,
    color,
    iconName,
    iconColor
  };
  const [isDismissed, setIsDismissed] = useState(false);

  function dismissNotification() {
    setIsDismissed(true);
  }

  return !isDismissed ? (
    <Notification
      ref={ref}
      $variant={colorVariant}
      className={className}
      style={style}
      $restyleAnchors={restyleAnchors}
      role={role}
    >
      <NotificationContent
        dismissNotification={dismissNotification}
        {...notificationContentProps}
      >
        {children}
      </NotificationContent>
    </Notification>
  ) : (
    <></>
  );
});
