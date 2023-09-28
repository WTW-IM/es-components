export default function getFirstDefinedValue<T>(
  ...args: (T | undefined)[]
): T | undefined {
  const firstDefined = args.find(arg => arg !== undefined);
  return firstDefined;
}
