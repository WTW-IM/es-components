export default function getFirstDefined<T>(
  ...args: (T | undefined)[]
): T | undefined {
  const firstDefined = args.find(arg => arg !== undefined);
  return firstDefined;
}
