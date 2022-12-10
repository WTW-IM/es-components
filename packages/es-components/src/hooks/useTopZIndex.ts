import { useCallback } from 'react';

let topIndex = 0;
let lastComputeTime = 0;

function getCurrentTopIndex() {
  const allDocumentElements = [...document.getElementsByTagName('*')];
  let shadowElements = allDocumentElements.filter(el => el.shadowRoot);
  let allElements = [...allDocumentElements];

  while (shadowElements.length) {
    const targetShadowEl = shadowElements.pop();
    const newElements = [...targetShadowEl.shadowRoot.querySelectorAll('*')];
    allElements = [...allElements, ...newElements];
    shadowElements = [
      ...shadowElements,
      ...newElements.filter(el => el.shadowRoot)
    ];
  }

  const allIndexes = allElements.map(
    el => parseInt(window.getComputedStyle(el).zIndex, 10) || 0
  );

  const topIndex = allIndexes.reduce(
    (topInd, ind) => (ind > topInd ? ind : topInd),
    allIndexes[0]
  );

  return topIndex + 1;
}

export default function useTopZIndex() {
  const getTopIndex = useCallback(() => {
    // only compute at most every 1 second
    if (new Date().getTime() - lastComputeTime < 1000) return topIndex;

    const newIndex = getCurrentTopIndex();
    lastComputeTime = new Date().getTime();
    topIndex = newIndex;
    return topIndex;
  }, []);

  return getTopIndex;
}
