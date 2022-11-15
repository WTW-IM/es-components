import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UnstyledBanner = styled.div``;
const Banner = styled(({ ...props }) => (
  <UnstyledBanner {...props}></UnstyledBanner>
))`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  align-items: center;
  border-radius: 2px;
  display: flex;
  margin-bottom: 25px;
  padding: 15px;
  ${props => `
    a {
      color: ${props.textColor};
      &:hover {
        text-decoration: none;
      }
    }
  `}
`;

Banner.propTypes = {
  children: PropTypes.node,
  /** Set a specific background color in the banner */
  bgColor: PropTypes.string,
  /** Set a specific font color in the banner */
  textColor: PropTypes.string
};

Banner.defaultProps = {
  children: null,
  bgColor: null,
  textColor: null
};

/** @component */
export default Banner;
