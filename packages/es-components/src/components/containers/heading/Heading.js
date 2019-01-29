import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// should eventually come from theme
const fontSize = {
  1: '44.78976px',
  2: '37.3248px',
  3: '31.104px',
  4: '25.92px',
  5: '21.6px',
  6: '18px'
};

const BaseHeading = css`
  color: inherit;
  font-size: ${props => fontSize[props.adjustedSize]};
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 12.5px;
  margin-top: 25px;

  small {
    font-size: ${props => (props.adjustedSize > 3 ? '75%' : '65%')};
    line-height: 1;
  }
`;

// most of these, along with the switch statement, can be removed when we
// upgrade to styled-components v4 and can use the "as" prop
const Heading1 = styled.h1`
  ${BaseHeading};
`;

const Heading2 = styled.h2`
  ${BaseHeading};
`;

const Heading3 = styled.h3`
  ${BaseHeading};
`;

const Heading4 = styled.h4`
  ${BaseHeading};
`;

const Heading5 = styled.h5`
  ${BaseHeading};
`;

const Heading6 = styled.h6`
  ${BaseHeading};
`;

function Heading({ children, level, size, ...other }) {
  const adjustedSize = size || level;

  let HeaderStyled;
  switch (level) {
    case 2:
      HeaderStyled = Heading2;
      break;
    case 3:
      HeaderStyled = Heading3;
      break;
    case 4:
      HeaderStyled = Heading4;
      break;
    case 5:
      HeaderStyled = Heading5;
      break;
    case 6:
      HeaderStyled = Heading6;
      break;
    default:
      HeaderStyled = Heading1;
      break;
  }
  return (
    <HeaderStyled adjustedSize={adjustedSize} {...other}>
      {children}
    </HeaderStyled>
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
