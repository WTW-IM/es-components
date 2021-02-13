import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRootNodeLocator } from '../../util/useRootNode';

const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

const iconStyleAttribute = 'data-es-icon-styles';

const getExistingStyleTag = node =>
  node.querySelector(`[${iconStyleAttribute}]`);

const createStyleTag = () => {
  const styleTag = document.createElement('link');
  styleTag.setAttribute(iconStyleAttribute, '');
  styleTag.setAttribute('rel', 'stylesheet');
  styleTag.setAttribute(
    'href',
    'https://bdaim-webexcdn-p.azureedge.net/es-assets/icons.css'
  );
  return styleTag;
};

const setupGlobalStyleTag = () =>
  getExistingStyleTag(document) ||
  (() => {
    document.head.append(createStyleTag());
  })();

const setupNodeStyleTag = node =>
  getExistingStyleTag(node) ||
  (() => {
    node.prepend(createStyleTag());
  })();

const setupStyleTag = node =>
  node === document.body ? setupGlobalStyleTag() : setupNodeStyleTag(node);

const applyStyles = async rootNode => {
  try {
    setupStyleTag(rootNode);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to load icon styles', err);
  }
};

function Icon({ name, size, className, ...other }) {
  const [rootNode, RootNodeInput] = useRootNodeLocator();

  useEffect(() => {
    if (!rootNode) return;

    applyStyles(rootNode);
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
