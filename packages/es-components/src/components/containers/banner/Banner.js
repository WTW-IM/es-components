/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import PropTypes from 'prop-types';


const BannerContainer = styled.div`
  align-items: center;
  background-color: ${props => props.variant.bgColor};
  border-radius: 2px;
  color: ${props => props.variant.textColor};
  display: flex;
  padding: ${({theme}) => theme.spacing.defaultMargin};
  
  
  ${props =>`
    a {
      color: ${props.variant.textColor};

      &:hover {
        text-decoration: none;
      }
    }
  `}
  button[aria-expanded] {
    color: ${props => props.variant.textColor};
  }
`;
const Banner = React.forwardRef(function InnerBanner({ type, ...props }, ref) {
  const theme = useTheme();
  const variant = theme.bannerStyles[type];
  const bannerProps = { variant, ...props };
  return (<BannerContainer ref={ref} {...bannerProps} />)
})

Banner.propTypes = {
/** The type of notification to render */
type: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'advisor'])
  .isRequired
};

export default Banner;
