import React, { useEffect, useRef } from 'react';
import { useRootClose } from 'react-overlays';

// eslint-disable-next-line react/prop-types
const RootCloseWrapper = ({ children, onRootClose, disabled, className, container }) => {
  const ref = useRef();
  useEffect(()=>{
    const clickListener = event => {
      console.log('NEW CLICK', event)
      console.log('click listener target', event.target.shadowRoot?.activeElement)
      console.log('container', container)
      if (!event.target.shadowRoot?.activeElement || !container.contains(event.target.shadowRoot?.activeElement))
      {
        console.log('in if statement')
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
