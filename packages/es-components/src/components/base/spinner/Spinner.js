import React from 'react';
import styled, { keyframes } from 'styled-components';
import useUniqueId from '../../util/useUniqueId';

const rotatorAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const ieAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dashoffset: 187;
  }

  50% {
    stroke-dashoffset: 37.4;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

const colorsAnimation = props => keyframes`
  0% {
    stroke: ${props.theme.brandColors.primary1};
  }
  40% {
    stroke: ${props.theme.brandColors.primary2};
  }
  80% {
    stroke: ${props.theme.brandColors.primary3};
  }
  100% {
    stroke: ${props.theme.brandColors.primary1};
  }
`;

const SpinnerSvg = styled.svg`
  animation: ${rotatorAnimation} 1.4s linear infinite;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    animation: ${ieAnimation} 1.4s linear infinite;
  }
`;

const SpinnerCircle = styled.circle`
  stroke: ${props => props.theme.brandColors.secondary1};
  stroke-dasharray: 187;
  stroke-dashoffset: 37.4;
  transform-origin: center;
  animation: ${dashAnimation} 1.4s ease-in-out infinite,
    ${colorsAnimation} 3.5s ease-in-out infinite;
`;

const Spinner = ({ title, description, ...other }) => {
  const titleId = title && `${useUniqueId(other.id)}-title`;
  const descId = description && `${useUniqueId(other.id)}-desc`;

  return (
    <SpinnerSvg
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`.trim()}
      {...other}
    >
      {title && <title id={titleId}>{title}</title>}
      {description && <desc id={descId}>{description}</desc>}
      <SpinnerCircle
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </SpinnerSvg>
  );
};

// eslint-disable-next-line consistent-return
const descriptionTitleProp = (props, propName, componentName) => {
  if (!props.title && !props.description) {
    return new Error(
      `You must provide a title, description, or both to ${componentName}.`
    );
  }
};

Spinner.propTypes = {
  /** The title of the spinner for screen readers. This or `description` is
   * required */
  title: descriptionTitleProp,
  /** The description of the spinner for screen readers. This or `title` is
   * required */
  description: descriptionTitleProp
};

Spinner.defaultProps = {
  title: '',
  description: ''
};

export default Spinner;
