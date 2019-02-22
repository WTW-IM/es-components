import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AnswerSet = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    float: left;
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
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  itemWidth: PropTypes.number,
  styleType: PropTypes.string,
  selectedType: PropTypes.string
};

AnswerGroup.defaultProps = {
  styleType: 'primary',
  selectedType: 'success',
  itemWidth: '75px'
};

export default AnswerGroup;
