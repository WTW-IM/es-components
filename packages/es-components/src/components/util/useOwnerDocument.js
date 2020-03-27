import { useState, useCallback } from 'react';

export default function useOwnerDocument(currentDocument) {
  const [ownerDocument, setOwnerDocument] = useState(currentDocument);
  const ownerDocumentRef = useCallback(node => {
    if (!node) return;
    const targetDocument =
      node.ownerDocument?.body || node.ownerDocument || currentDocument;
    if (ownerDocument !== targetDocument) setOwnerDocument(targetDocument);
  });
  return [ownerDocument, ownerDocumentRef];
}
