import React, { useRef } from 'react';
import { useRootClose } from 'react-overlays';

// eslint-disable-next-line react/prop-types
const RootCloseWrapper = ({ children, onRootClose, disabled, className }) => {
  const ref = useRef();
  useRootClose(ref, onRootClose, {
    disabled
  });

  return (
    <div ref={ref} className={`root-close-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default RootCloseWrapper;
