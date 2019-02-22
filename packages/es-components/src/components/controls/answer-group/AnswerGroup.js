import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AnswerSet = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
  }
`;

function AnswerGroup({
  name,
  children,
  itemWidth,
  styleType,
  selectedType,
  ...rest
}) {
  const renderButtons = () =>
    React.Children.map(children, (child, index) => {
      const key = `${name}-option-${index + 1}`;
      return React.cloneElement(child, {
        key,
        name,
        itemWidth,
        styleType,
        selectedType,
        ...rest
      });
    });

  return <AnswerSet>{renderButtons()}</AnswerSet>;
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
  selectedType: PropTypes.string
};

AnswerGroup.defaultProps = {
  styleType: 'primary',
  selectedType: 'success',
  itemWidth: '75px'
};

export default AnswerGroup;
