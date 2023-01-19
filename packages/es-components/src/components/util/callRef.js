const callRef = (ref, element) => {
  if (ref) {
    if (typeof ref === 'function') {
      ref(element);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = element;
    }
  }
};

export default callRef;
