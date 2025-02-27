import React from 'react';
import type * as CSS from 'csstype';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import tinycolor from 'tinycolor2';
import { useTheme } from '../../util/useTheme';

export interface SkeletonTheme extends DefaultTheme {
  skeleton: {
    shimmerColor: CSS.Property.BackgroundColor;
    shapeColor: CSS.Property.BackgroundColor;
  };
}

export interface SkeletonThemeProps {
  theme: SkeletonTheme;
}

const SkeletonContainer = styled.div<SkeletonThemeProps>`
  position: relative;
  background-color: ${({ theme: { skeleton } }) => skeleton.shimmerColor};

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    animation: loading-keyframes 2s linear infinite;
    background-image: linear-gradient(
      -60deg,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor).setAlpha(0).toRgbString()}
        0,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor).setAlpha(0).toRgbString()}
        40%,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor).setAlpha(0.8).toRgbString()}
        50%,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor).setAlpha(0).toRgbString()}
        60%,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor).setAlpha(0).toRgbString()}
        100%
    );
    background-repeat: no-repeat;
    background-size: 50%;
    content: '';
  }

  @keyframes loading-keyframes {
    0% {
      background-position: -150% 0;
    }

    75% {
      background-position: 250% 0;
    }

    100% {
      background-position: 250% 0;
    }
  }
`;

const SkeletonShape = styled.div<SkeletonThemeProps>`
  background-color: ${({ theme: { skeleton } }) => skeleton.shapeColor};
`;

export type LoadingSkeletonProps = JSXElementProps<'div'> & {
  shapeColor?: CSS.Property.BackgroundColor;
  shimmerColor?: CSS.Property.BackgroundColor;
};

const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  function ForwardedLoadingSkeleton(
    { shapeColor, shimmerColor, ...props },
    ref
  ) {
    const theme = useTheme() as SkeletonTheme;
    const { colors } = theme;
    const shimmer = shimmerColor || colors.white;
    const shape = shapeColor || colors.gray3;
    const skeleton = { shimmerColor: shimmer, shapeColor: shape };
    return (
      <ThemeProvider theme={{ ...theme, skeleton } as DefaultTheme}>
        <SkeletonContainer ref={ref} {...props} />
      </ThemeProvider>
    );
  }
);

LoadingSkeleton.propTypes = {
  shapeColor: PropTypes.string,
  shimmerColor: PropTypes.string
};

LoadingSkeleton.defaultProps = {
  shapeColor: '',
  shimmerColor: ''
};

type LoadingSkeletonComponent = typeof LoadingSkeleton & {
  Shape: typeof SkeletonShape;
};

(LoadingSkeleton as LoadingSkeletonComponent).Shape = SkeletonShape;

export default LoadingSkeleton as LoadingSkeletonComponent;
