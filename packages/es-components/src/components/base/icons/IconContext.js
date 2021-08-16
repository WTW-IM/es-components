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

const defaultIconContext = {
  initializedNodes: []
};

const documentAppend = tag => document.head.append(tag);
const initializeBody = node => {
  if (getExistingStyleTag(document.head)) return node;

  return addTag(node, documentAppend);
};

const initializeNode = node => {
  // body must always be set up
  setup(document.body); // eslint-disable-line no-use-before-define
  return addTag(node, tag => node.prepend(tag));
};

const setup = node => {
  if (!node) return;

  const { initializedNodes } = defaultIconContext;

  if (initializedNodes.some(initializedNode => initializedNode === node))
    return;

  const isBody = node === document.body;

  (() =>
    (isBody ? initializeBody : initializeNode)(node) &&
    initializedNodes.push(node))();
};

const IconContext = createContext({ ...defaultIconContext, setup });

export default IconContext;
