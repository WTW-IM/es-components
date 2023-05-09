import React from 'react';
import ReactModal from 'react-modal';

declare module 'react-modal' {
  export const propTypes: ReactModal.Props;
}
