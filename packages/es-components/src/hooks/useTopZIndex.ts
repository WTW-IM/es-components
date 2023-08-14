import { useCallback } from 'react';

let topIndex = 0;
let lastComputeTime = 0;
let totalElementCount = 0;

function computeCurrentTopIndex() {
  const allDocumentElements = [...document.getElementsByTagName('*')];
  let shadowElements = allDocumentElements.filter(el => el.shadowRoot);
  let allElements = [...allDocumentElements];

  while (shadowElements.length) {
    const targetShadowEl = shadowElements.pop();
    const newElements = [
      ...(targetShadowEl?.shadowRoot?.querySelectorAll('*') || [])
    ];
    allElements = [...allElements, ...newElements];
    shadowElements = [
      ...shadowElements,
      ...newElements.filter(el => el.shadowRoot)
    ];
  }

  if (allElements.length === totalElementCount) {
    // no new elements added since last time
    return topIndex;
  }

  totalElementCount = allElements.length;

  const allIndexes = allElements.map(
    el => parseInt(window.getComputedStyle(el).zIndex, 10) || 0
  );

  const newTopIndex = allIndexes.reduce(
    (topInd, ind) => (ind > topInd ? ind : topInd),
    allIndexes[0]
  );

  topIndex = newTopIndex + 1;
  lastComputeTime = new Date().getTime();
  return topIndex;
}

let naiveTopIndex = 1000;
function getNaiveTopIndex() {
  return naiveTopIndex++;
}

export default function useTopZIndex() {
  const getTopIndex = useCallback(() => {
    // only compute at most every 1 second
    if (new Date().getTime() - lastComputeTime < 1000) return topIndex;
    if (process?.env?.NODE_ENV === 'test') return getNaiveTopIndex();

    computeCurrentTopIndex();
    return topIndex;
  }, []);

  return getTopIndex;
}
