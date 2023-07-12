/* eslint-disable
  @typescript-eslint/no-explicit-any,
  @typescript-eslint/restrict-template-expressions
*/
const isBool = (v: any): v is boolean =>
  `${v}` === 'true' || `${v}` === 'false';
export default isBool;
