import 'get-root-node-polyfill/implement';
import React, { useState, useCallback } from 'react';

export default function useRootNode(initialRoot?: HTMLElement) {
  const [rootNode, setRootNode] = useState(initialRoot);
  const nodeRef = useCallback(
    (node?: HTMLElement | null) => {
      if (!node) return;
      const foundRoot = node.getRootNode();
      const targetNode = (foundRoot as Document).body || foundRoot;
      if (initialRoot !== targetNode) setRootNode(targetNode);
    },
    [initialRoot]
  );
  return [rootNode, nodeRef] as const;
}

export function useRootNodeLocator(initialRoot?: HTMLElement) {
  const [rootNode, rootNodeRef] = useRootNode(initialRoot);
  const RootNodeInput = useCallback(
    () => <input type="hidden" ref={rootNodeRef} />,
    [rootNodeRef]
  );
  return [rootNode, RootNodeInput] as const;
}
