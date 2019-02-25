import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const outlineStyles = css`
  > label:first-child > div {
    border-radius: 4px 0 0 4px;
  }

  > label:last-child > div {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }

  > label:not(:first-child):not(:last-child) > div {
    border-left: 1px;
  }
`;

const AnswerSet = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${props => props.isOutline && outlineStyles};
`;

function AnswerGroup({
  name,
  disableAllOptions,
  children,
  itemWidth,
  styleType,
  selectedType,
  selectedValue,
  isOutline,
  ...rest
}) {
  const renderButtons = () =>
    React.Children.map(children, (child, index) => {
      const key = `${name}-option-${index + 1}`;
      const disabled = disableAllOptions || child.props.disabled;
      const checked = selectedValue === child.props.value;
      return React.cloneElement(child, {
        key,
        name,
        itemWidth,
        styleType,
        selectedType,
        isOutline,
        disabled,
        defaultChecked: checked,
        ...rest
      });
    });

  return <AnswerSet isOutline={isOutline}>{renderButtons()}</AnswerSet>;
}

AnswerGroup.propTypes = {
  /** The name of the answer group */
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  /** The width of each item when in desktop view */
  itemWidth: PropTypes.string,
  /** Select the color style of the buttons, types come from theme */
  styleType: PropTypes.string,
  /** Select the color style of the selected button, types come from theme */
  selectedType: PropTypes.string,
  /** Set the button size, sizes come from theme (buttonStyles) */
  size: PropTypes.string,
  /** Set if the items should have a flat outline style */
  isOutline: PropTypes.bool,
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool,
  /** Selected option for the answer group */
  selectedValue: PropTypes.any
};

AnswerGroup.defaultProps = {
  styleType: 'default',
  selectedType: 'success',
  size: 'default',
  itemWidth: '75px',
  isOutline: false,
  disableAllOptions: false,
  selectedValue: undefined
};

export default AnswerGroup;
