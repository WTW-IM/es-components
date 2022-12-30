import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const RootCloseWrapper = ({ children, onRootClose, className, container }) => {
  const ref = useRef();
  useEffect(()=>{
    const clickListener = event => {
      if (!event.target.shadowRoot?.activeElement || !(container.contains(event.target.shadowRoot?.activeElement) || container.contains(event.target.shadowRoot?.activeElement?.shadowRoot?.activeElement)))
      {
        onRootClose(event);
      }
    }
    document.addEventListener('click', clickListener)

    return () => {
      document.removeEventListener('click', clickListener)
    }
  }, [])

  return (
    <div ref={ref} className={`root-close-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default RootCloseWrapper;
