import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .ReactModal__Body--open {
    overflow-y: hidden;
  }

  .slide-pane__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0,0,0,0);
    z-index: 1000;
  }

  .slide-pane__overlay.ReactModal__Overlay--after-open {
    background-color: rgba(0,0,0,0.3);
    transition: background-color 0.5s;
  }

  .slide-pane__overlay.ReactModal__Overlay--before-close {
    background-color: rgba(0,0,0,0);
  }
`;
