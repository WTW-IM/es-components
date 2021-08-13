import { createContext } from 'react';

class NodeError extends Error {
  constructor(node, ...errorArgs) {
    super(...errorArgs);
    this.node = node;
  }
}

const iconStyleAttribute = 'data-es-icon-styles';
const iconsAsset = 'https://bdaim-webexcdn-p.azureedge.net/es-assets/icons.css';

const getExistingStyleTag = node =>
  node.querySelector(`[${iconStyleAttribute}]`) ||
  node.querySelector(`link[href="${iconsAsset}"]:not([rel="preload"])`);

const createStyleTag = () => {
  const styleTag = document.createElement('link');
  styleTag.setAttribute(iconStyleAttribute, '');
  styleTag.setAttribute('rel', 'stylesheet');
  styleTag.setAttribute('href', iconsAsset);
  return styleTag;
};

const addTag = (node, func) => {
  try {
    const foundTag = getExistingStyleTag(node);
    if (foundTag) return foundTag;

    const tag = createStyleTag();
    func(tag);
    return tag;
  } catch (err) {
    const nodeError = new NodeError(
      node,
      'Failed to load icon styles on node',
      { cause: err }
    );
    console.error(nodeError); // eslint-disable-line no-console
    return undefined;
  }
};

const documentAppend = tag => document.head.append(tag);
const defaultIconContext = {
  initializedNodes: [],
  setup: node => {
    if (!node) return;

    const { initializedNodes } = defaultIconContext;

    if (initializedNodes.some(initializedNode => initializedNode === node))
      return;

    const isBody = node === document.body;

    if (isBody && getExistingStyleTag(document.head)) {
      initializedNodes.push(node);
      return;
    }

    if (!isBody) {
      // body must always be set up
      defaultIconContext.setup(document.body);
    }

    const tagFunc = isBody ? documentAppend : tag => node.prepend(tag);

    (() => addTag(node, tagFunc) && initializedNodes.push(node))();
  }
};
const IconContext = createContext(defaultIconContext);

export default IconContext;
