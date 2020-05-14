import 'get-root-node-polyfill/implement';
import React, { useState, useCallback } from 'react';

export default function useRootNode(initialRoot) {
  const [rootNode, setRootNode] = useState(initialRoot);
  const nodeRef = useCallback(node => {
    if (!node) return;
    const foundRoot = node.getRootNode();
    const targetNode = foundRoot.body || foundRoot;
    if (initialRoot !== targetNode) setRootNode(targetNode);
  });
  return [rootNode, nodeRef];
}

export function useRootNodeLocator(initialRoot) {
  const [rootNode, rootNodeRef] = useRootNode(initialRoot);
  const RootNodeInput = useCallback(
    () => <input type="hidden" ref={rootNodeRef} />,
    []
  );
  return [rootNode, RootNodeInput];
}
