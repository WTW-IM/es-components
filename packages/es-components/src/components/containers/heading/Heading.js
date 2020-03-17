import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeadingBase = styled.h1`
  background-color: ${props =>
    props.isKnockoutStyle && props.theme.colors.primary};
  border-bottom: ${props =>
    props.underlineColor && `2px solid ${props.underlineColor};`};
  color: ${props => (props.isKnockoutStyle ? 'white' : 'inherit')};
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props =>
    props.adjustedSize > 2
      ? props.theme.font.headingDesktop[props.adjustedSize]
      : `calc(${props.theme.font.headingDesktop[props.adjustedSize]} - 6px);`};
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 0.45em;
  margin-top: 0;
  padding-bottom: ${props => props.underlineColor && '0.22em'};
  padding: ${props => props.isKnockoutStyle && '20px 15px'};

  small {
    font-size: ${props => (props.adjustedSize > 3 ? '75%' : '65%')};
    line-height: 1;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    font-size: ${props => props.theme.font.headingDesktop[props.adjustedSize]};
  }
`;

function Heading({
  children,
  level,
  size,
  isKnockoutStyle,
  underlineColor,
  ...other
}) {
  const adjustedSize = size || level;
  const hLevel = `h${level}`;

  return (
    <HeadingBase
      as={hLevel}
      adjustedSize={adjustedSize}
      isKnockoutStyle={isKnockoutStyle}
      underlineColor={underlineColor}
      {...other}
    >
      {children}
    </HeadingBase>
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  /** Heading level element */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  /** Override the default font size with another level */
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Alternate knockout-style header with a solid background */
  isKnockoutStyle: PropTypes.bool,
  /** Include an underline with the provided color */
  underlineColor: PropTypes.string
};

Heading.defaultProps = {
  children: undefined,
  size: undefined,
  isKnockoutStyle: false,
  underlineColor: null
};

export default Heading;
