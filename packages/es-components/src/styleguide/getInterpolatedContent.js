const dynamicContentBlocks = {
  ASSETS_PATH: ASSETS_PATH
};

export default function getInterpolatedContent(content) {
  return Object.entries(dynamicContentBlocks).reduce(
    (finalContent, [blockName, blockValue]) =>
      finalContent.replace(new RegExp(`{{${blockName}}}`, 'g'), blockValue),
    content
  );
}
