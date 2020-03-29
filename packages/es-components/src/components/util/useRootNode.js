import { useState, useCallback } from 'react';

export default function useRootNode(initialRoot) {
  const [rootNode, setRootNode] = useState(initialRoot);
  const nodeRef = useCallback(node => {
    if (!node) return;
    const foundRoot = node.getRootNode();
    const targetNode = foundRoot?.body || foundRoot;
    if (initialRoot !== targetNode) setRootNode(targetNode);
  });
  return [rootNode, nodeRef];
}
