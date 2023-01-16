import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  useState
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import getStyledProp from '../../util/getStyledProp';
import Icon, { iconBaseStyles } from '../../base/icons/Icon';
import InputBase, {
  useValidationStyleProps,
  validationStateHighlightStyles,
  validationStateInputStyles,
  validationStateSetupStyles,
  noInset,
  basicTextboxStyles
} from './InputBase';

const noop = () => {
  // noop
};

const computeStyle = (...args) => {
  try {
    return window.getComputedStyle(...args);
  } catch (err) {
    if (err.message.match(/Not Implemented/i)) {
      return {};
    }
    throw err;
  }
};

const getIconStyles = icon => {
  const computedStyle = computeStyle(icon);
  const beforeStyle = computeStyle(icon, ':before');
  return css`
    ${iconBaseStyles}

    // computed styles
    content: ${beforeStyle.content};
    font-family: ${computedStyle.fontFamily};
    font-size: ${computedStyle.fontSize};

    // themed addon styles
    background-color: ${getStyledProp('backgroundColor', 'addOn')};
    color: ${getStyledProp('textColor', 'addOn')};

    // base addon styles
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1;
    margin: 0;
    outline: 0;
    padding: 0.333em 0.6111em;
  `;
};

const InputWrapper = styled.div`
  ${validationStateSetupStyles}
  ${validationStateInputStyles}
  display: flex;
  border-radius: ${getStyledProp('inputStyles.borderRadius')};

  &.focused {
    ${validationStateHighlightStyles}
  }

  ${({ hasPrepend, prependIcon }) =>
    hasPrepend &&
    prependIcon &&
    css`
      &&:before {
        ${getIconStyles(prependIcon)}
      }
    `}
  ${({ hasAppend, appendIcon }) =>
    hasAppend &&
    appendIcon &&
    css`
      &&:after {
        ${getIconStyles(appendIcon)}
      }
    `}
`;

export const TextboxBase = styled(InputBase)`
  ${basicTextboxStyles}
  border: none;

  ${({ hasPrepend }) =>
    hasPrepend &&
    css`
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    `}

  ${({ hasAppend }) =>
    hasAppend &&
    css`
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    `}

  &&:focus {
    box-shadow: ${noInset};
  }
`;

const Hidden = props => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      visibility: 'hidden',
      overflow: 'visible',
      width: 0,
      height: 0,
      left: -5000
    }}
    {...props}
  />
);

const Textbox = React.forwardRef(function Textbox(props, ref) {
  const {
    prependIconName,
    appendIconName,
    type,
    flat,
    ...additionalTextProps
  } = props;
  const [focused, setFocused] = useState(false);
  const validationProps = useValidationStyleProps({ flat });

  const inputRef = useRef();
  useImperativeHandle(ref, () => inputRef.current);

  const [prependIcon, setPrependIcon] = useState();
  const [appendIcon, setAppendIcon] = useState();

  const hasPrepend = !!prependIconName;
  const hasAppend = !!appendIconName;
  const prependProps = { hasPrepend, hasAppend };
  const sharedProps = { ...validationProps, ...prependProps };

  const focusInput = useCallback(() => inputRef.current?.focus(), []);
  const handleFocus = useCallback(
    ev => ((props.onFocus || noop)(ev), setFocused(true)),
    [props.onFocus]
  );
  const handleBlur = useCallback(
    ev => ((props.onBlur || noop)(ev), setFocused(false)),
    [props.onBlur]
  );

  return (
    <InputWrapper
      className={focused ? 'focused' : ''}
      as="div"
      onClick={focusInput}
      {...{
        ...sharedProps,
        prependIcon,
        appendIcon
      }}
    >
      <Hidden>
        <Icon ref={setPrependIcon} name={prependIconName} size={18} />
        <Icon ref={setAppendIcon} name={appendIconName} size={18} />
      </Hidden>
      <TextboxBase
        ref={inputRef}
        type={type}
        {...additionalTextProps}
        {...sharedProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </InputWrapper>
  );
});

Textbox.propTypes = {
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string,
  /** The type attribute for the textboxa */
  type: PropTypes.string,
  /** Whether the textbox is the flat style or not */
  flat: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

Textbox.defaultProps = {
  prependIconName: undefined,
  appendIconName: undefined,
  type: 'text',
  flat: undefined,
  onFocus: undefined,
  onBlur: undefined
};

export default Textbox;
