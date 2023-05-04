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

export const iconBaseStyles = css`
  ${iconBasics}
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

const StyledIcon = styled.i`
  ${iconBaseStyles}
`;

const Icon = React.forwardRef(function ForwardedIcon(
  { name, size, className, ...other },
  ref
) {
  const [rootNode, RootNodeInput] = useRootNodeLocator();
  useContext(IconContext).setup(rootNode);

  return (
    <>
      <RootNodeInput />
      <StyledIcon
        className={`bds-icon bds-${name} ${className || ''}`.trim()}
        size={/^\d+$/.test(size) ? `${size}px` : size || 'inherit'}
        aria-hidden
        ref={ref}
        {...other}
      />
    </>
  );
});

export const propTypes = {
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
