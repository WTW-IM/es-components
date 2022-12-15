import React, { FC, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRootNodeLocator } from '../../util/useRootNode';
import IconContext from './IconContext';

export interface IconProps {
  name: string;
  size?: string | number;
  className?: string;
  iconColor?: string;
  alwaysShowIcon?: boolean;
}

const StyledIcon = styled.i<{ size: string }>`
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

const Icon: FC<IconProps> = ({ name, size, className, ...other }) => {
  const [rootNode, RootNodeInput] = useRootNodeLocator();
  useContext(IconContext).setup(rootNode);

  return (
    <>
      <RootNodeInput />
      <StyledIcon
        className={`bds-icon bds-${name} ${className || ''}`.trim()}
        size={
          /^\d+$/.test(size?.toString() || '')
            ? `${size || ''}px`
            : size?.toString() || 'inherit'
        }
        aria-hidden
        {...other}
      />
    </>
  );
};

Icon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Additional classes to include */
  className: PropTypes.string
};

Icon.defaultProps = {
  size: undefined,
  className: undefined
};

export default Icon;
