import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRootNodeLocator } from '../../util/useRootNode';

let { fetch } = window;
const getFetch = async () => {
  if (fetch) return;

  await import('whatwg-fetch');
  const { fetch: newFetch } = window;
  fetch = newFetch;
};
getFetch();

const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

let stylesAdded = false;

function Icon({ name, size, className, ...other }) {
  const [rootNode, RootNodeInput] = useRootNodeLocator();
  useEffect(() => {
    if (stylesAdded || !rootNode) return;

    const addStyles = async () => {
      stylesAdded = true;
      const styles = await fetch(
        'https://bdaim-webexcdn-p.azureedge.net/es-assets/icons.css'
      );
      if (!styles.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to load icon styles', styles.error);
        stylesAdded = false;
        return;
      }
      const styleTag = document.createElement('style');
      styleTag.innerHTML = await styles.text();
      rootNode.prepend(styleTag);
    };
    addStyles();
  }, [rootNode]);
  return (
    <>
      <RootNodeInput />
      <StyledIcon
        className={`bds-icon bds-${name} ${className || ''}`.trim()}
        size={/^\d+$/.test(size) ? `${size}px` : size || 'inherit'}
        aria-hidden
        {...other}
      />
    </>
  );
}

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
