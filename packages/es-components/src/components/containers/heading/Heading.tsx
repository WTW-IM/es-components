import React from 'react';
import PropTypes from 'prop-types';
import styled, {
  DefaultTheme,
  ThemedStyledProps,
  css
} from 'styled-components';
import { HeadingLevel, headingLevel } from 'es-components-shared-types';
import { baseFontCss } from '../../base/global-styles/GlobalStyleDefaults';

const knockoutStyles = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 20px 15px;
`;

const getMarginBottom = (size: string) => {
  const sizeNum = parseFloat(size);
  if (sizeNum > 36) {
    return '1.5rem';
  }

  if (sizeNum > 26) {
    return '1.25rem';
  }

  if (sizeNum > 18) {
    return '1rem';
  }

  return '0.75rem';
};

const getHeadingSizeCss = (
  { font: { headingMobile, headingDesktop }, screenSize }: DefaultTheme,
  adjustedSize: HeadingLevel
) => css`
  font-size: ${headingMobile[adjustedSize]};
  margin-bottom: ${getMarginBottom(headingMobile[adjustedSize])};

  small {
    font-size: ${adjustedSize > 3 ? '75%' : '65%'};
  }

  @media (min-width: ${screenSize.tablet}) {
    font-size: ${headingDesktop[adjustedSize]};
    margin-bottom: ${getMarginBottom(headingDesktop[adjustedSize])};
  }
`;

export const globalHeadingSizesCss = css`
  ${({ theme }) =>
    headingLevel.map(
      size => css`
        h${size} {
          ${getHeadingSizeCss(theme, size)}
        }
      `
    )}
`;

export const headingBaseCss = css`
  font-weight: 300;
  line-height: calc(1em + 0.5rem);
  margin-bottom: 0.45em;
  margin-top: 0;
  color: inherit;

  small {
    line-height: 1;
  }
`;

export type HeadingProps = JSXElementProps<'h1'> & {
  children?: React.ReactNode;
  level?: HeadingLevel;
  size?: HeadingLevel;
  isKnockoutStyle?: boolean;
  underlineColor?: string | null;
};

function getAdjustedProps<R>(
  func: (
    props: ThemedStyledProps<HeadingProps, DefaultTheme> & {
      adjustedSize: HeadingLevel;
    }
  ) => R
) {
  return ({
    size,
    level = 1,
    ...props
  }: ThemedStyledProps<HeadingProps, DefaultTheme>) =>
    func({
      ...props,
      size,
      level,
      adjustedSize: size || level
    });
}

const UnstyledHeading = styled.h1``;
const Heading = styled(({ level = 1, ...props }: HeadingProps) => (
  <UnstyledHeading as={`h${level}`} {...props} />
))`
  ${baseFontCss}
  ${headingBaseCss}
  border-bottom: ${props =>
    props.underlineColor && `2px solid ${props.underlineColor};`};
  padding-bottom: ${props => props.underlineColor && '0.22em'};
  ${getAdjustedProps(({ theme, adjustedSize }) =>
    getHeadingSizeCss(theme, adjustedSize)
  )}

  && {
    ${({ isKnockoutStyle }) => isKnockoutStyle && knockoutStyles}
  }
`;

Heading.propTypes = {
  children: PropTypes.node,
  /** Heading level element */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Override the default font size with another level */
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Alternate knockout-style header with a solid background */
  isKnockoutStyle: PropTypes.bool,
  /** Include an underline with the provided color */
  underlineColor: PropTypes.string
};

Heading.defaultProps = {
  children: undefined,
  level: 1,
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
