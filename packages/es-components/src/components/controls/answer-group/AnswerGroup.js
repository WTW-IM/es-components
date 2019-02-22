import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const AnswerSet = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//
//   @media (min-width: ${props => props.theme.screenSize.desktop}) {
//     float: left;
//   }
// `;

function AnswerGroup({ name, children, ...rest }) {
  return React.Children.map(children, (child, index) => {
    const key = `${name}-option-${index + 1}`;
    return React.cloneElement(child, {
      key,
      name,
      ...rest
    });
  });
}

AnswerGroup.propTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired
};

export default AnswerGroup;
