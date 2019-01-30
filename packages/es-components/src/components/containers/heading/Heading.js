import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeadingBase = styled.h1`
  color: inherit;
  font-size: ${props => props.theme.headingSize[props.adjustedSize]};
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 12.5px;
  margin-top: 25px;

  small {
    font-size: ${props => (props.adjustedSize > 3 ? '75%' : '65%')};
    line-height: 1;
  }
`;

function Heading({ children, level, size, ...other }) {
  const adjustedSize = size || level;
  const hLevel = `h${level}`;
  return (
    <HeadingBase as={hLevel} adjustedSize={adjustedSize} {...other}>
      {children}
    </HeadingBase>
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  /** Heading level element */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  /** Override the default font size with another level */
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

Heading.defaultProps = {
  children: undefined,
  size: undefined
};

export default Heading;
