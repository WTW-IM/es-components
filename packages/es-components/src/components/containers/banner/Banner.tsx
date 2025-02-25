import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../util/useTheme';
import PropTypes from 'prop-types';
import {
  ValidationStyleType,
  validationStyleTypes,
  BannerBlock
} from 'es-components-shared-types';

const BannerContainer = styled.div<{ variant: BannerBlock }>`
  align-items: center;
  background-color: ${props => props.variant.bgColor};
  border-radius: 2px;
  color: ${props => props.variant.textColor};
  display: flex;
  padding: ${({ theme }) => theme.spacing.defaultMargin};

  ${props => css`
    & a,
    & button[aria-expanded] {
      color: ${props.variant.textColor};
    }

    a {
      &:hover {
        text-decoration: none;
      }
    }
  `}
`;

export type BannerProps = Override<
  JSXElementProps<'div'>,
  {
    type: ValidationStyleType;
  }
>;

const defaultVariant = {
  bgColor: '#bd3d1e0',
  textColor: '#000'
};

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  function InnerBanner({ type, ...props }, ref) {
    const theme = useTheme();
    const variant = theme?.bannerStyles[type] ?? defaultVariant;
    const bannerProps = { variant, ...props };
    return <BannerContainer ref={ref} {...bannerProps} />;
  }
);

export const propTypes = {
  /** The type of notification to render */
  type: PropTypes.oneOf<ValidationStyleType>(validationStyleTypes).isRequired
};

Banner.propTypes = propTypes;

export default Banner;
