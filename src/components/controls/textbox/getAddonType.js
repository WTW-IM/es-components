export default function getAddonType(hasPrependedContent, hasAppendedContent) {
  if (hasPrependedContent && hasAppendedContent) {
    return 'both';
  } else if (hasPrependedContent && !hasAppendedContent) {
    return 'prepend';
  } else if (!hasPrependedContent && hasAppendedContent) {
    return 'append';
  }

  return null;
}
