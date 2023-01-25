import 'get-root-node-polyfill/implement';
import React, { useState, useCallback } from 'react';

export function getRootElement(node) {
  const foundRoot = node.getRootNode();
  const targetNode = foundRoot.body || foundRoot;
  return targetNode;
}

export default function useRootNode(initialRoot) {
  const [rootNode, setRootNode] = useState(initialRoot);
  const nodeRef = useCallback(
    node => {
      if (!node) return;
      const targetNode = getRootElement(node);
      if (initialRoot !== targetNode) setRootNode(targetNode);
    },
    [initialRoot]
  );
  return [rootNode, nodeRef];
}

export function useRootNodeLocator(initialRoot) {
  const [rootNode, rootNodeRef] = useRootNode(initialRoot);
  const RootNodeInput = useCallback(
    () => <input type="hidden" ref={rootNodeRef} />,
    [rootNodeRef]
  );
  return [rootNode, RootNodeInput];
}
