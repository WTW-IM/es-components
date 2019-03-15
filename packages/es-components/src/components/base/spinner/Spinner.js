import React from 'react';
import PropTypes from 'prop-types';
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

const colorsAnimation = keyframes`
  0% {
    stroke: #00a0d2;
  }
  40% {
    stroke: #00c389;
  }
  80% {
    stroke: #c110a0;
  }
  100% {
    stroke: #00a0d2;
  }
`;

const SpinnerSvg = styled.svg`
  animation: ${rotatorAnimation} 1.4s linear infinite;
`;

const SpinnerCircle = styled.circle`
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dashAnimation} 1.4s ease-in-out infinite,
    ${colorsAnimation} 3.5s ease-in-out infinite;
`;

const Spinner = ({ title, description, ...props }) => {
  const titleId = title && `${useUniqueId(props.id)}-title`;
  const descId = description && `${useUniqueId(props.id)}-desc`;

  return (
    <SpinnerSvg
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`.trim()}
      {...props}
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

const descriptionTitleProp = (props, ...otherParams) => {
  if (!props.title && !props.description) {
    return new Error('You must provide a title, description, or both.');
  }
  return PropTypes.string(props, ...otherParams);
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
