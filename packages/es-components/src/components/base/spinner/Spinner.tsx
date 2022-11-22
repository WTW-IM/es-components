import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, ThemeProps } from 'styled-components';
import { RequireAtLeastOne } from '../../../../types/generics';
import useUniqueId from '../../util/useUniqueId';
import { Theme } from '../../../../types/theme';

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

const colorsAnimation = (props: ThemeProps<Theme> ) => keyframes`
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

interface SpinnerPropsBase {
  /** The title of the spinner for screen readers. This or `description` is
   * required */
  title?: string;
  /** The description of the spinner for screen readers. This or `title` is
   * required */
  description?: string;
}

export type SpinnerProps = RequireAtLeastOne<SpinnerPropsBase & { id: string; }, 'title' | 'description'>;

const Spinner: FC<SpinnerProps & { id: string; }> = ({ title, description, ...other }) => {
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
const descriptionTitleProp = (props: { [key: string]: any }, propName: string, componentName: string) => {
  if (!props.title && !props.description) {
    return new Error(
      `You must provide a title, description, or both to ${componentName}.`
    );
  }
  return null;
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
