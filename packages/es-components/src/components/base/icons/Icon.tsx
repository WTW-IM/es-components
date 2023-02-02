import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useRootNodeLocator } from '../../util/useRootNode';
import IconContext from './IconContext';

export const iconBasics = css`
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const iconBaseStyles = css<{ size: string | number }>`
  ${iconBasics}
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

export interface IconProps {
  name?: string;
  size?: string | number;
  className?: string;
  iconColor?: string;
  alwaysShowIcon?: boolean;
}

const StyledIcon = styled.i<{ size: string | number }>`
  ${iconBaseStyles}
`;

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
  ...StyledIcon.propTypes,
  /** Name of the icon to display */
  name: PropTypes.string,
  /** Specify icon size in pixels */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Additional classes to include */
  className: PropTypes.string
};

export const defaultProps = {
  size: undefined,
  className: undefined
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
