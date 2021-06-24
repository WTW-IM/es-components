import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const knockoutStyles = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 20px 15px;
`;

const getAdjustedProps = func => ({ size, level = 1, ...props }) =>
  func({
    ...props,
    size,
    level,
    adjustedSize: size || level
  });

const UnstyledHeading = styled.h1``;
const Heading = styled(({ level = 1, ...props }) => (
  <UnstyledHeading as={`h${level}`} {...props} />
))`
  border-bottom: ${props =>
    props.underlineColor && `2px solid ${props.underlineColor};`};
  color: inherit;
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${getAdjustedProps(
    ({ theme, adjustedSize }) => theme.font.headingMobile[adjustedSize]
  )};
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 0.45em;
  margin-top: 0;
  padding-bottom: ${props => props.underlineColor && '0.22em'};

  && {
    ${({ isKnockoutStyle }) => isKnockoutStyle && knockoutStyles}
  }

  small {
    font-size: ${getAdjustedProps(({ adjustedSize }) =>
      adjustedSize > 3 ? '75%' : '65%'
    )};
    line-height: 1;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    font-size: ${getAdjustedProps(
      ({ adjustedSize, theme }) => theme.font.headingDesktop[adjustedSize]
    )};
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

export const PageHeading = styled(Heading).attrs({
  isKnockoutStyle: true,
  level: 1
})``;
