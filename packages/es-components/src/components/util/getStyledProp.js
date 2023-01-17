export default function getStyledProp(propPath, propTarget = 'theme') {
  return props => {
    let targ = props[propTarget];
    const properties = propPath.split('.');
    while (properties.length && targ) {
      targ = targ[properties.shift()];
    }
    return targ;
  };
}
