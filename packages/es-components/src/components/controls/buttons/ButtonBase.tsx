import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  htmlButtonPropTypes,
  htmlButtonDefaultProps
} from '../../util/htmlProps';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

// Using this because React does not like many of our upstream props.
// This allows that to flow without issue.
const UnstyledButton = styled.button`
  // noop
`;

export type ButtonBaseProps = Override<
  JSXElementProps<'button'>,
  {
    waiting?: Maybe<boolean>;
  }
>;

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  function ButtonBaseInner({ waiting, onClick: onClickProp, ...props }, ref) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClick = useMonitoringCallback(
      (
        currentOnClick,
        ...args: Parameters<React.MouseEventHandler<HTMLButtonElement>>
      ) => !waiting && currentOnClick?.(...args),
      [waiting],
      onClickProp
    );

    const computedProps = {
      ...props,
      ...(waiting ? { 'data-waiting': waiting } : {})
    };

    return (
      <UnstyledButton
        type="button"
        onClick={onClick}
        {...computedProps}
        ref={ref}
      />
    );
  }
);

export const propTypes: PropTypesOf<ButtonBaseProps> = {
  ...htmlButtonPropTypes,
  /** Styles the Button with the "disabled" state and prevents click action */
  waiting: PropTypes.bool
};

export const defaultProps = {
  ...htmlButtonDefaultProps,
  waiting: false
};

export type ButtonDefaultProps = typeof defaultProps;

ButtonBase.propTypes = propTypes;
ButtonBase.defaultProps = defaultProps;

export default ButtonBase;
