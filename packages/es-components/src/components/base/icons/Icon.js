import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRootNodeLocator } from '../../util/useRootNode';

const getFetch = async () => {
  if (window.fetch) return window.fetch;

  await import('whatwg-fetch');
  return window.fetch;
};

const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${props => props.size};
  text-decoration: none;
  vertical-align: text-bottom;
`;

const iconStyleAttribute = 'data-es-icon-styles';
const getStyleTag = async (node, global) =>
  node.querySelector(`[${iconStyleAttribute}]`) ||
  (async () => {
    const styleTag = document.createElement('style');

    const addStyleTag = () =>
      node === document
        ? document.head.append(styleTag)
        : node.prepend(styleTag);

    const loadStyles = async () => {
      const styles = await (await getFetch())(
        'https://bdaim-webexcdn-p.azureedge.net/es-assets/icons.css'
      );
      if (!styles.ok) {
        styleTag.remove();
        throw new Error(styles.error);
      }
      return styles.text();
    };

    styleTag.setAttribute(iconStyleAttribute, '');
    addStyleTag(node, styleTag);

    if (!global) return styleTag;

    styleTag.innerHTML = await loadStyles();
    return styleTag;
  })();

const waitForStyleText = async tag =>
  new Promise(resolve => {
    const checkForText = () =>
      tag.innerHTML
        ? resolve(tag.innerHTML)
        : window.requestAnimationFrame(checkForText);
    checkForText();
  });

const applyStyles = async rootNode => {
  try {
    const globalStyleTag = await getStyleTag(document, true);
    const styleText = await waitForStyleText(globalStyleTag);

    const nodeStyleTag = await getStyleTag(rootNode);

    // if we're not inside a Web Component, innerHTML will already be correct.
    if (nodeStyleTag === globalStyleTag) return;

    nodeStyleTag.innerHTML = styleText;
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
