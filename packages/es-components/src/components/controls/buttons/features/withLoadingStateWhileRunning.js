import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLoadingState } from '../../../../hooks/useLoadingState';

export const withLoadingStateWhileRunning = (
  ButtonComponent,
  options = { useDisabledStyling: true }
) => {
  const StyledButton = styled(ButtonComponent)`
    ${({ displayAsRunning }) =>
      displayAsRunning &&
      `
      :hover{
        color: white;
      }
      :focus{
        box-shadow: 0 1px 1px grey, 0 0 0 0.2rem grey;
        color: lightgrey;
        background-color: grey;
        border-color: grey;
      }
      color: lightgrey;
      background-color: grey;
      cursor: not-allowed;
      border-color: grey;
    `}
  `;

  const ButtonWithLoadingState = React.forwardRef(
    (
      {
        showWhileRunning: runningContent,
        children,
        onClick,
        styleType,
        ...otherProps
      },
      ref
    ) => {
      const [isRunning, showRunningWhile] = useLoadingState();
      const runOperation = (...params) =>
        runningContent
          ? !isRunning && showRunningWhile(onClick(...params))
          : onClick(...params);

      return (
        <StyledButton
          {...otherProps}
          styleType={runningContent && isRunning ? undefined : styleType}
          displayAsRunning={options.useDisabledStyling && isRunning}
          onClick={runOperation}
          ref={ref}
        >
          {runningContent && isRunning ? runningContent : children}
        </StyledButton>
      );
    }
  );

  ButtonWithLoadingState.propTypes = {
    showWhileRunning: PropTypes.any,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    styleType: PropTypes.string
  };

  ButtonWithLoadingState.defaultProps = {
    styleType: 'default',
    showWhileRunning: undefined,
    onClick: undefined
  };

  return ButtonWithLoadingState;
};
