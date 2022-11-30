import React from 'react';

interface ModalContextInterface {
  onHide: () => void;
  ariaId: string;
}

export const ModalContext = React.createContext<ModalContextInterface>({
  onHide: function (): void {
    throw new Error('Function not implemented.');
  },
  ariaId: ''
});
