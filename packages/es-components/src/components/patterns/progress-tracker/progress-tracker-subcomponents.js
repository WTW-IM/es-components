import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import sizes from './pt-sizes';

const { ACTIVE, INACTIVE, DESKTOP, TRACKING_LINE_HEIGHT } = sizes;

const getProgressLineBreakPercentage = (activeStepIndex, numberOfSteps) =>
  (activeStepIndex / (numberOfSteps - 1)) * 100;

const getProgressItemWidthPercentage = baseAmount => (1 / baseAmount) * 100;

const getCenterTopPosition = (containerHeight, itemHeight) =>
  containerHeight / 2 - itemHeight / 2;

const stepStates = {
  active: 'active',
  pastStep: 'isPastStep',
  clickableFutureStep: 'clickableFutureStep'
};

export const ProgressContainer = styled.ol`
  align-items: flex-start;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.gray9} 0%,
    ${props => props.theme.colors.gray9}
      ${props =>
        getProgressLineBreakPercentage(
          props.activeStepIndex,
          props.numberOfSteps
        )}%,
    ${props => props.theme.colors.gray5}
      ${props =>
        getProgressLineBreakPercentage(
          props.activeStepIndex,
          props.numberOfSteps
        )}%,
    ${props => props.theme.colors.gray5} 100%
  );
  background-size: 100% ${() => TRACKING_LINE_HEIGHT}px;
  background-position: 0
    ${() => getCenterTopPosition(ACTIVE, TRACKING_LINE_HEIGHT)}px;
  background-repeat: no-repeat;
  counter-reset: progress-tracker-counter;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    background-position: center
      ${() => getCenterTopPosition(DESKTOP, TRACKING_LINE_HEIGHT)}px;
    background-size: ${props =>
        100 - getProgressItemWidthPercentage(props.numberOfSteps)}%
      ${() => TRACKING_LINE_HEIGHT}px;
  }
`;

ProgressContainer.propTypes = {
  activePercentage: PropTypes.number
};

const BasicProgressButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  counter-increment: progress-tracker-counter;
  display: flex;
  flex-flow: column nowrap;
  font-family: 'Source Sans Pro', sans-serif;
  margin-top: ${() => getCenterTopPosition(ACTIVE, INACTIVE)}px;
  padding: 0;
  text-align: center;

  &:active,
  &:hover,
  &:focus {
    outline: none;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    font-size: 18px;
    margin-top: 0;
    width: 100%;
  }

  span {
    color: ${props => props.theme.colors.gray9};
    display: none;
    font-size: 18px;
    line-height: 1.1em;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      display: inline;
      font-weight: normal;
    }
  }

  &::before {
    background-color: white;
    border: ${props => `1px solid ${props.theme.colors.gray5}`};
    border-radius: ${() => INACTIVE}px;
    box-shadow: 0 0 0 3px white;
    box-sizing: border-box;
    color: ${props => props.theme.colors.gray9};
    content: counter(progress-tracker-counter);
    display: block;
    font-size: ${() => INACTIVE * 0.8}px;
    height: ${() => INACTIVE}px;
    line-height: 1em;
    margin-bottom: 5px;
    text-align: center;
    width: ${() => INACTIVE}px;
    position: relative;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      border-radius: ${() => DESKTOP}px;
      border-width: 3px;
      font-size: ${() => DESKTOP * 0.488}px;
      font-weight: normal;
      height: ${() => DESKTOP}px;
      line-height: 1.7em;
      width: ${() => DESKTOP}px;
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
    border: 5px solid ${props => props.theme.brandColors.primary3};
    border-radius: ${ACTIVE}px;
    color: ${props => props.theme.brandColors.primary3};
    font-size: ${ACTIVE * 0.488}px;
    font-weight: bold;
    height: ${ACTIVE}px;
    line-height: 1.5em;
    width: ${ACTIVE}px;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      border-width: 5px;
      font-size: ${() => DESKTOP * 0.488}px;
      height: ${() => DESKTOP}px;
      line-height: 1.5em;
      width: ${() => DESKTOP}px;
    }
  }

  span {
    color: ${props => props.theme.brandColors.primary3};
    display: inline;
    font-weight: bold;

    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      font-weight: bold;
    }
  }
`;

const ProgressLi = styled.li`
  list-style-type: none;
  max-width: ${props =>
    getProgressItemWidthPercentage(props.numberOfSteps - 1)}%;
  align-items: center;

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
    width: ${props => getProgressItemWidthPercentage(props.numberOfSteps)}%;

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

function getProgressItemType(itemType, showNav) {
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

function getStepState(isActiveStep, isPastStep, canClickFutureStep) {
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

export function ProgressItem({
  active,
  isPastStep,
  numberOfSteps,
  onPastStepClicked,
  canClickFutureStep,
  label,
  showNav
}) {
  let itemType;
  if (isPastStep || active || canClickFutureStep) {
    itemType = getStepState(active, isPastStep, canClickFutureStep);
  }
  const ProgressItemType = getProgressItemType(itemType, showNav);

  const listItemProps = {
    numberOfSteps,
    disabled: !isPastStep && !canClickFutureStep,
    onClick: onPastStepClicked
  };

  return (
    <ProgressLi numberOfSteps={numberOfSteps}>
      <ProgressItemType {...listItemProps}>
        <span>{label}</span>
      </ProgressItemType>
    </ProgressLi>
  );
}

ProgressItem.propTypes = {
  active: PropTypes.bool.isRequired,
  isPastStep: PropTypes.bool.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
  onPastStepClicked: PropTypes.func,
  label: PropTypes.string,
  canClickFutureStep: PropTypes.bool,
  showNav: PropTypes.bool
};

ProgressItem.defaultProps = {
  onPastStepClicked() {},
  label: '',
  canClickFutureStep: false,
  showNav: true
};
