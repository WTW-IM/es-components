import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import sizes from './pt-sizes';
import useUniqueId from '../../util/useUniqueId';

const { ACTIVE, INACTIVE, DESKTOP, TRACKING_LINE_HEIGHT } = sizes;

const getProgressLineBreakPercentage = (
  activeStepIndex: number,
  numberOfSteps: number
) => (activeStepIndex / (numberOfSteps - 1)) * 100;

const getProgressItemWidthPercentage = (baseAmount: number) =>
  (1 / baseAmount) * 100;

const getCenterTopPosition = (containerHeight: number, itemHeight: number) =>
  containerHeight / 2 - itemHeight / 2;

const stepStates = {
  active: 'active',
  pastStep: 'isPastStep',
  clickableFutureStep: 'clickableFutureStep'
} as const;

type StepState = (typeof stepStates)[keyof typeof stepStates];

interface ProgressContainerProps {
  $activeStepIndex: number;
  $numberOfSteps: number;
}

export const ProgressContainer = styled.ol<ProgressContainerProps>`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 0;
  margin-left: 0;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.gray9} 0%,
    ${props => props.theme.colors.gray9}
      ${props =>
        getProgressLineBreakPercentage(
          props.$activeStepIndex,
          props.$numberOfSteps
        )}%,
    ${props => props.theme.colors.gray5}
      ${props =>
        getProgressLineBreakPercentage(
          props.$activeStepIndex,
          props.$numberOfSteps
        )}%,
    ${props => props.theme.colors.gray5} 100%
  );
  background-position: 0
    ${() => getCenterTopPosition(ACTIVE, TRACKING_LINE_HEIGHT)}px;
  background-repeat: no-repeat;
  background-size: 100% ${() => TRACKING_LINE_HEIGHT}px;
  counter-reset: progress-tracker-counter;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    background-position: center
      ${() => getCenterTopPosition(DESKTOP, TRACKING_LINE_HEIGHT)}px;
    background-size: ${props =>
        100 - getProgressItemWidthPercentage(props.$numberOfSteps)}%
      ${() => TRACKING_LINE_HEIGHT}px;
  }
`;

export const BasicProgressButton = styled.button`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0;
  border: none;
  margin-top: ${() => getCenterTopPosition(ACTIVE, INACTIVE)}px;
  background: none;
  counter-increment: progress-tracker-counter;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;

  &:active,
  &:hover,
  &:focus {
    outline: none;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin: 0 auto;
    margin-top: 0;
    font-size: 18px;
  }

  span {
    display: none;
    color: ${props => props.theme.colors.gray9};
    font-size: 18px;
    line-height: 1.1em;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      display: inline;
      font-weight: normal;
    }
  }

  &::before {
    position: relative;
    display: block;
    width: ${() => INACTIVE}px;
    height: ${() => INACTIVE}px;
    box-sizing: border-box;
    border: ${props => `1px solid ${props.theme.colors.gray5}`};
    border-radius: ${() => INACTIVE}px;
    margin-bottom: 5px;
    background-color: white;
    box-shadow: 0 0 0 3px white;
    color: ${props => props.theme.colors.gray9};
    content: counter(progress-tracker-counter);
    font-size: ${() => INACTIVE * 0.8}px;
    line-height: 1em;
    text-align: center;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      width: ${() => DESKTOP}px;
      height: ${() => DESKTOP}px;
      border-width: 3px;
      border-radius: ${() => DESKTOP}px;
      font-size: ${() => DESKTOP * 0.488}px;
      font-weight: normal;
      line-height: 1.7em;
    }
  }
`;

const FutureProgressButton = styled(BasicProgressButton)`
  cursor: pointer;

  &:hover {
    &::before {
      box-shadow: rgba(0, 0, 0, 0.35) 0 0 3px 1px;
    }
  }

  &:active,
  &:hover,
  &:focus {
    span {
      text-decoration: underline;
    }
  }
`;

const PastProgressButton = styled(BasicProgressButton)`
  cursor: pointer;

  &:hover {
    &::before {
      box-shadow: rgba(0, 0, 0, 0.35) 0 0 3px 1px;
    }
  }

  &:active,
  &:hover,
  &:focus {
    span {
      text-decoration: underline;
    }
  }

  &:focus {
    &::before {
      box-shadow: ${props => props.theme.colors.inputFocus} 0 0 4px 2px;
    }

    span {
      outline: 1px dotted ${props => props.theme.colors.inputFocus};
    }
  }

  &::before {
    border-color: ${props => props.theme.colors.gray9};

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      border-width: 5px;
      font-weight: bold;
      line-height: 1.5em;
    }
  }

  span {
    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      font-weight: bold;
    }
  }
`;

const NonNavigablePastProgressButton = styled(BasicProgressButton)`
  &::before {
    border-color: ${props => props.theme.colors.gray9};

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      border-width: 5px;
      font-weight: bold;
      line-height: 1.5em;
    }
  }

  span {
    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      font-weight: bold;
    }
  }
`;

const ActiveProgressButton = styled(BasicProgressButton)`
  margin-top: 0;

  &::before {
    width: ${ACTIVE}px;
    height: ${ACTIVE}px;
    border: 5px solid ${props => props.theme.brandColors.primary3};
    border-radius: ${ACTIVE}px;
    color: ${props => props.theme.brandColors.primary3};
    font-size: ${ACTIVE * 0.488}px;
    font-weight: bold;
    line-height: 1.5em;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      width: ${() => DESKTOP}px;
      height: ${() => DESKTOP}px;
      border-width: 5px;
      font-size: ${() => DESKTOP * 0.488}px;
      line-height: 1.5em;
    }
  }

  span {
    display: inline;
    color: ${props => props.theme.brandColors.primary3};
    font-weight: bold;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      font-weight: bold;
    }
  }
`;

interface ProgressLiProps {
  $numberOfSteps: number;
}

const ProgressLi = styled.li<ProgressLiProps>`
  display: flex;
  max-width: ${props =>
    getProgressItemWidthPercentage(props.$numberOfSteps - 1)}%;
  align-items: center;
  list-style-type: none;

  &:first-child {
    &,
    & button {
      align-items: flex-start;
      text-align: left;
    }
  }

  &:last-child {
    &,
    & button {
      align-items: flex-end;
      text-align: right;
    }
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    width: ${props => getProgressItemWidthPercentage(props.$numberOfSteps)}%;

    &:first-child,
    &:last-child {
      &,
      & button {
        align-items: center;
        text-align: center;
      }
    }
  }
`;

function getProgressItemType(
  itemType: Maybe<StepState>,
  showNav: Maybe<boolean>
) {
  switch (itemType) {
    case stepStates.active:
      return ActiveProgressButton;
    case stepStates.pastStep:
      return showNav ? PastProgressButton : NonNavigablePastProgressButton;
    case stepStates.clickableFutureStep:
      return showNav ? FutureProgressButton : BasicProgressButton;
    default:
      return BasicProgressButton;
  }
}

function getStepState(
  isActiveStep: Maybe<boolean>,
  isPastStep: Maybe<boolean>,
  canClickFutureStep: Maybe<boolean>
) {
  if (isActiveStep) {
    return stepStates.active;
  }

  if (isPastStep) {
    return stepStates.pastStep;
  }

  if (canClickFutureStep) {
    return stepStates.clickableFutureStep;
  }

  return stepStates.active;
}

type ProgressItemProps = {
  active?: Maybe<boolean>;
  isPastStep?: Maybe<boolean>;
  numberOfSteps: number;
  onPastStepClicked?: () => void;
  onFutureStepClicked?: () => void;
  canClickFutureStep?: Maybe<boolean>;
  label?: string;
  showNav?: Maybe<boolean>;
};

export const ProgressItem = React.forwardRef<HTMLLIElement, ProgressItemProps>(
  function ForwardedProgressItem(
    {
      active,
      isPastStep,
      numberOfSteps,
      onPastStepClicked,
      onFutureStepClicked,
      canClickFutureStep,
      label,
      showNav = true
    },
    ref
  ) {
    let itemType;
    if (isPastStep || active || canClickFutureStep) {
      itemType = getStepState(active, isPastStep, canClickFutureStep);
    }
    const ProgressItemType = getProgressItemType(itemType, showNav);
    const itemId = useUniqueId();

    const listItemProps = {
      disabled: !isPastStep && !canClickFutureStep,
      onClick: isPastStep ? onPastStepClicked : onFutureStepClicked
    };

    return (
      <ProgressLi $numberOfSteps={numberOfSteps} ref={ref}>
        <ProgressItemType
          {...listItemProps}
          id={itemId}
          aria-labelledby={`${itemId}-span`}
        >
          <span id={`${itemId}-span`}>{label}</span>
        </ProgressItemType>
      </ProgressLi>
    );
  }
);

ProgressItem.propTypes = {
  active: PropTypes.bool.isRequired,
  isPastStep: PropTypes.bool.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
  onPastStepClicked: PropTypes.func,
  label: PropTypes.string,
  canClickFutureStep: PropTypes.bool,
  showNav: PropTypes.bool
};
