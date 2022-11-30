import React, { useRef } from 'react';
import { useRootClose } from 'react-overlays';

// eslint-disable-next-line react/prop-types

interface RootCloseWrapperProps {
  children: React.ReactNode;
  onRootClose: (
    ...rootCloseArgs: Parameters<Parameters<typeof useRootClose>[1]>
  ) => void;
  disabled: boolean;
  className?: string;
}

const RootCloseWrapper: React.FC<RootCloseWrapperProps> = ({
  children,
  onRootClose,
  disabled,
  className
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useRootClose(ref.current, onRootClose, {
    disabled
  });

  return (
    <div ref={ref} className={`root-close-wrapper ${className || ''}`}>
      {children}
    </div>
  );
};

export default RootCloseWrapper;
