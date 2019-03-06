import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Icon from '../../base/icons/Icon';
import InputBase from './InputText';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const defaultBorderRadius = '2px';

const CommonInputStyles = css`
  border-bottom-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-bottom-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  border-top-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-top-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  box-sizing: border-box;
  color: inherit;
  display: table-cell;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  padding-right: 2em;
  -webkit-appearance: none;
`;

const Input = styled(InputBase)`
  ${CommonInputStyles};
`;

const ValidationIconWrapper = styled.span`
  height: 0;
  position: relative;
  width: 0;
`;

const ValidationIcon = styled(Icon)`
  height: 20px;
  pointer-events: none;
  position: absolute;
  right: 11px;
  top: 10px;
`;

const AddOn = css`
  background-color: ${props => props.addOnBgColor};
  border: 1px solid
    ${props =>
      props.addOnBgColor === props.theme.colors.gray3
        ? props.theme.colors.gray5
        : props.addOnBgColor};
  border-radius: ${defaultBorderRadius};
  box-sizing: border-box;
  color: ${props => props.addOnTextColor};
  display: table-cell;
  height: 39px;
  line-height: 1.2;
  padding: 6px 11px;

  i {
    line-height: 1;
    vertical-align: middle;
  }
`;

const Prepend = styled.span`
  ${AddOn} border-bottom-right-radius: 0;
  border-right: none;
  border-top-right-radius: 0;
`;

const Append = styled.span`
  ${AddOn} border-bottom-left-radius: 0;
  border-left: none;
  border-top-left-radius: 0;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Textbox = React.forwardRef((props, ref) => {
  const { prependIconName, appendIconName, ...additionalTextProps } = props;
  const theme = useTheme();

  const validationState = React.useContext(ValidationContext);

  const hasPrepend = !!prependIconName;
  const hasAppend = !!appendIconName;
  const hasValidationIcon = validationState !== 'default';

  const addOnTextColor = hasValidationIcon
    ? theme.colors.white
    : theme.colors.gray8;
  const addOnBgColor = hasValidationIcon
    ? theme.validationTextColor[validationState]
    : theme.colors.gray3;

  return (
    <InputWrapper>
      {hasPrepend && (
        <Prepend addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
          <Icon aria-hidden="true" name={prependIconName} size={18} />
        </Prepend>
      )}
      <Input
        hasAppend={hasAppend}
        hasPrepend={hasPrepend}
        type="text"
        ref={ref}
        {...additionalTextProps}
        {...theme.validationInputColor[validationState]}
      />
      {hasValidationIcon && (
        <ValidationIconWrapper>
          <ValidationIcon
            aria-hidden="true"
            name={theme.validationIconName[validationState]}
            size={18}
          />
        </ValidationIconWrapper>
      )}
      {hasAppend && (
        <Append addOnTextColor={addOnTextColor} addOnBgColor={addOnBgColor}>
          <Icon aria-hidden="true" name={appendIconName} size={18} />
        </Append>
      )}
    </InputWrapper>
  );
});

Textbox.propTypes = {
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string
};

Textbox.defaultProps = {
  prependIconName: undefined,
  appendIconName: undefined
};

export default Textbox;
