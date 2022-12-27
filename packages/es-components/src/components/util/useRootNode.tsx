import 'get-root-node-polyfill/implement';
import React, { useState, useCallback } from 'react';

export type RootNode = HTMLElement | undefined;

export default function useRootNode(initialRoot?: RootNode) {
  const [rootNode, setRootNode] = useState<RootNode>(initialRoot);
  const nodeRef = useCallback<React.RefCallback<HTMLElement>>(
    (node: Maybe<RootNode>) => {
      if (!node) return;

      const foundRoot = node.getRootNode();
      const targetNode = (foundRoot as Document).body || foundRoot;
      if (initialRoot !== targetNode) setRootNode(targetNode);
    },
    [initialRoot]
  );
  return [rootNode, nodeRef] as const;
}

export function useRootNodeLocator(initialRoot?: RootNode) {
  const [rootNode, rootNodeRef] = useRootNode(initialRoot);
  const RootNodeInput = useCallback(
    () => <input type="hidden" ref={rootNodeRef} />,
    [rootNodeRef]
  );
  return [rootNode, RootNodeInput] as const;
}
