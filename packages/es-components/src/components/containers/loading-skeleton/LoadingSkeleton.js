import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import tinycolor from 'tinycolor2';
import { useTheme } from '../../util/useTheme';

const SkeletonContainer = styled.div`
  position: relative;
  background-color: ${({ theme: { skeleton } }) => skeleton.shimmerColor};

  &::after {
    animation: loading-keyframes 1.5s linear infinite;
    background-size: 50%;
    background-repeat: no-repeat;
    background-image: linear-gradient(
      -60deg,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor)
            .setAlpha(0)
            .toRgbString()}
        0,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor)
            .setAlpha(0)
            .toRgbString()}
        40%,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor)
            .setAlpha(0.8)
            .toRgbString()}
        50%,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor)
            .setAlpha(0)
            .toRgbString()}
        60%,
      ${({ theme: { skeleton } }) =>
          tinycolor(skeleton.shimmerColor)
            .setAlpha(0)
            .toRgbString()}
        100%
    );
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @keyframes loading-keyframes {
    from {
      background-position: -150% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;

const SkeletonShape = styled.div`
  background-color: ${({ theme: { skeleton } }) => skeleton.shapeColor};
`;

const LoadingSkeleton = ({ shapeColor, shimmerColor, children, ...props }) => {
  const theme = useTheme();
  const { colors } = theme;
  const shimmer = shimmerColor || colors.white;
  const shape = shapeColor || colors.gray3;
  const skeleton = { shimmerColor: shimmer, shapeColor: shape };
  return (
    <ThemeProvider theme={{ skeleton }}>
      <SkeletonContainer {...props}>{children}</SkeletonContainer>
    </ThemeProvider>
  );
};

LoadingSkeleton.propTypes = {
  shapeColor: PropTypes.string,
  shimmerColor: PropTypes.string,
  children: PropTypes.node
};

LoadingSkeleton.defaultProps = {
  shapeColor: null,
  shimmerColor: null,
  children: null
};

LoadingSkeleton.Shape = SkeletonShape;

export default LoadingSkeleton;
