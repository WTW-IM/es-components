import React, { useCallback, useRef } from 'react';
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
    waiting?: Maybe<boolean>;
  }
>;

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  function ButtonBaseInner(passedProps, ref) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { waiting, onClick: _onClick, ...props } = passedProps;
    const propsRef = useRef(passedProps);
    propsRef.current = passedProps;
    const innerClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (...args) => !waiting && (propsRef.current.onClick || noop)(...args),
      [waiting]
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
