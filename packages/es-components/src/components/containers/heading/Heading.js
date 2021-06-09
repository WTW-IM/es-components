import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Heading = styled.h1.attrs(({ size, level = 1 }) => ({
  as: `h${level}`,
  adjustedSize: size || level
}))`
  background-color: ${props =>
    props.isKnockoutStyle && props.theme.colors.primary};
  border-bottom: ${props =>
    props.underlineColor && `2px solid ${props.underlineColor};`};
  color: ${props => (props.isKnockoutStyle ? 'white' : 'inherit')};
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${({ theme, adjustedSize }) =>
    theme.font.headingMobile[adjustedSize]};
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 0.45em;
  margin-top: 0;
  padding-bottom: ${props => props.underlineColor && '0.22em'};
  padding: ${props => props.isKnockoutStyle && '20px 15px'};

  small {
    font-size: ${({ adjustedSize }) => (adjustedSize > 3 ? '75%' : '65%')};
    line-height: 1;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    font-size: ${({ adjustedSize, theme }) =>
      theme.font.headingDesktop[adjustedSize]};
  }
`;

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

/** @component */
export default Heading;

export const PageHeading = props => (
  <Heading isKnockoutStyle level={1} {...props} />
);
