import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  htmlButtonPropTypes,
  htmlButtonDefaultProps
} from '../../util/htmlProps';

import noop from '../../util/noop';

// Using this because React does not like many of our upstream props.
// This allows that to flow without issue.
const UnstyledButton = styled.button`
  // noop
`;

export type ButtonBaseProps = Override<
  JSXElementProps<'button'>,
  {
    waiting?: boolean;
  }
>;

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  function ButtonBaseInner({ waiting, onClick, ...props }, ref) {
    const innerClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (...args) => !waiting && (onClick || noop)(...args),
      [waiting, onClick]
    );
    const computedProps = {
      ...props,
      ...(waiting ? { 'data-waiting': waiting } : {})
    };
    return (
      <UnstyledButton
        type="button"
        onClick={innerClick}
        {...computedProps}
        ref={ref}
      />
    );
  }
);

export const propTypes = {
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
