import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { IconName } from 'es-components-shared-types';
import genName from '../../util/generateAlphaName';
import { RootNodeProvider } from '../../util/useRootNode';
import {
  HiddenIconConfig,
  HiddenIcons,
  useIconStyles
} from '../../base/icons/useIconStyles';

const List = styled.ol`
  position: relative;
  z-index: 1;
  display: flex;
  padding: 0;
  margin: 0;
`;

type CSSStyle = ReturnType<typeof css>;

interface ListItemProps {
  $itemWidth: number;
  $iconStyles?: CSSStyle;
}

const ListItem = styled.li<ListItemProps>`
  position: relative;
  width: ${props => props.$itemWidth}%;
  color: ${props => props.theme.colors.gray6};
  list-style-type: none;
  text-align: center;

  & > .status-text {
    display: none;

    .done&,
    .active&,
    .error& {
      color: ${props => props.theme.brandColors.primary1};
    }

    .active&,
    .error& {
      display: inherit;
      font-weight: bold;
    }

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      display: inherit;
    }
  }

  &&::before {
    content: '';
    ${props => props.$iconStyles}
    background-color: white;
    border: 3px solid ${props => props.theme.colors.gray5};
    border-radius: 50%;
    font-weight: bold;
    height: 20px;
    line-height: 20px;
    margin: 5px auto 15px;
    text-align: center;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .error&,
    .active& {
      width: 30px;
      height: 30px;
      margin: 0 auto 10px;
      line-height: 30px;
    }

    .done&,
    .active& {
      border-color: ${props => props.theme.brandColors.primary1};
      color: ${props => props.theme.brandColors.primary1};
    }

    .done& {
      font-size: 14px;
    }

    .active& {
      font-size: 22px;
    }

    .error& {
      border-color: ${props => props.theme.colors.danger};
      color: ${props => props.theme.colors.danger};
      font-size: 18px;
    }

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      .done& {
        font-size: 22px;
      }
    }
  }

  &::after {
    position: absolute;
    z-index: -1;
    top: 17px;
    left: -50%;
    width: 100%;
    height: 4px;
    background-color: ${props => props.theme.colors.gray5};
    content: '';

    .active&,
    .done&,
    .error& {
      background-color: ${props => props.theme.brandColors.primary1};
    }
  }

  &:first-child::after {
    content: none;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    .status-text {
      display: inherit;
    }

    &.active::before,
    &.done::before {
      width: 30px;
      height: 30px;
      margin: 0 auto 10px;
      line-height: 30px;
    }
  }
`;

export type StatusTrackerProps = Override<
  JSXElementProps<'ol'>,
  {
    statusArray: React.ReactNode[];
    step?: number;
    isErrorState?: boolean;
  }
>;

type StatusTrackerItemState = 'active' | 'done' | 'error';

const iconClasses: { [key in StatusTrackerItemState]: IconName } = {
  active: 'ok',
  done: 'ok',
  error: 'remove'
};

type IconElements = { [key in IconName]?: HTMLElement | null };

const iconElements: IconElements = {};

const StatusTrackerIconContext = React.createContext(iconElements);

const StatusTrackerItem = React.forwardRef<
  HTMLLIElement,
  Override<
    JSXElementProps<'li'>,
    {
      isErrorState: boolean;
      isDone: boolean;
      isActive: boolean;
      itemWidth: number;
    }
  >
>(function ForwardedStatusTrackerItem(
  {
    isDone,
    isErrorState,
    isActive,
    itemWidth,
    className: propsClassName,
    ...props
  },
  ref
) {
  const statusClass: StatusTrackerItemState | '' = isDone
    ? 'done'
    : isErrorState
      ? 'error'
      : isActive
        ? 'active'
        : '';
  const iconClass = statusClass ? iconClasses[statusClass] : '';
  const iconEls = React.useContext(StatusTrackerIconContext);
  const targetIconStyles = useIconStyles(
    iconClass || 'ok',
    iconEls[iconClass || 'ok']
  );
  const iconStyles = statusClass ? targetIconStyles : undefined;
  const className = `${statusClass} ${propsClassName || ''}`.trim();

  return (
    <ListItem
      ref={ref}
      {...{
        ...props,
        className,
        $iconStyles: iconStyles,
        $itemWidth: itemWidth
      }}
    />
  );
});

const StatusTracker = React.forwardRef<HTMLOListElement, StatusTrackerProps>(
  function ForwardedStatusTracker(
    { statusArray, step = 1, isErrorState: isErrorStateProp, ...rest },
    ref
  ) {
    const itemWidth = 100 / statusArray.length;
    const [itemBaseKey] = useState(genName());
    const [okIcon, setOkIcon] = useState<HTMLElement | null>(null);
    const [errorIcon, setErrorIcon] = useState<HTMLElement | null>(null);

    const iconEls = useMemo<IconElements>(
      () => ({
        ok: okIcon,
        remove: errorIcon
      }),
      [okIcon, errorIcon]
    );

    const iconRefs = useMemo<HiddenIconConfig>(
      () => ({
        ok: setOkIcon,
        remove: setErrorIcon
      }),
      [setOkIcon, setErrorIcon]
    );

    return (
      <RootNodeProvider>
        <StatusTrackerIconContext.Provider value={iconEls}>
          <HiddenIcons icons={iconRefs} />
          <List ref={ref} {...rest}>
            {statusArray.map((status, i) => {
              const isActive = i + 1 === step;
              const isErrorState = isActive && Boolean(isErrorStateProp);
              const isDone = i + 1 < step;

              return (
                <StatusTrackerItem
                  key={itemBaseKey + i.toString()}
                  {...{ itemWidth, isErrorState, isDone, isActive }}
                >
                  <span className="status-text">{status}</span>
                </StatusTrackerItem>
              );
            })}
          </List>
        </StatusTrackerIconContext.Provider>
      </RootNodeProvider>
    );
  }
);

StatusTracker.propTypes = {
  /** Array of status descriptions which display sequentially under each step */
  statusArray: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** Used to set the current active step (1-based) */
  step: PropTypes.number,
  /** Displays the active status with an error state instead of a check mark */
  isErrorState: PropTypes.bool
};

export default StatusTracker;
