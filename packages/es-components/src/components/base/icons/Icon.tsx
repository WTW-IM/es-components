import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import type * as CSS from 'csstype';
import { IconName, iconNames } from 'es-components-shared-types';
import { useRootNodeLocator } from '../../util/useRootNode';
import IconContext from './IconContext';
import { htmlProps, htmlDefaultProps } from '../../util/htmlProps';

export const iconBasics = css`
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export type IconBaseProps = {
  size?: CSS.Property.FontSize;
};

export const iconBaseStyles = css<IconBaseProps>`
  ${iconBasics}
  ${({ size }) => css`
    display: inline-block;
    font-size: ${size || 'inherit'};
    text-decoration: none;
    vertical-align: text-bottom;
  `}
`;

const StyledIcon = styled.i<IconBaseProps>`
  ${iconBaseStyles}
`;

export type IconProps = Omit<JSXElementProps<'i'>, 'size'> & {
  name?: IconName;
  size?: CSS.Property.FontSize | number;
  iconColor?: string;
  alwaysShowIcon?: boolean;
};

const Icon = React.forwardRef<HTMLElement, IconProps>(function ForwardedIcon(
  { name, size, className, ...other },
  ref
) {
  const [rootNode, RootNodeInput] = useRootNodeLocator();
  useContext(IconContext).setup(rootNode);

  return (
    <>
      <RootNodeInput />
      <StyledIcon
        className={`bds-icon bds-${name || ''} ${className || ''}`.trim()}
        size={
          /^\d+$/.test(size?.toString() || '')
            ? `${size || ''}px`
            : size?.toString() || 'inherit'
        }
        aria-hidden
        ref={ref}
        {...other}
      />
    </>
  );
});

export const propTypes = {
  ...htmlProps,
  /** Name of the icon to display */
  name: PropTypes.oneOf<IconName>([...iconNames]),
  /** Specify icon size in pixels */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Additional classes to include */
  className: PropTypes.string
};

export const defaultProps = {
  ...htmlDefaultProps,
  size: undefined,
  className: undefined
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
