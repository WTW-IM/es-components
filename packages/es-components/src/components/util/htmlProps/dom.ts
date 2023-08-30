import PropTypes from 'prop-types';
import { DOMAttributes } from 'react';

type BasicDOMProps = DOMAttributes<HTMLElement>;

export type DOMPropTypes = PropTypesOf<BasicDOMProps>;

type NonNullableDOMKeys = NonNullableKeys<DOMPropTypes>;

type DOMDefaultProps = {
  [key in NonNullableDOMKeys]?: BasicDOMProps[key];
};

export const domProps: DOMPropTypes = {
  children: PropTypes.node,
  dangerouslySetInnerHTML: PropTypes.exact({
    __html: PropTypes.string.isRequired
  }),

  // Clipboard Events
  onCopy: PropTypes.func,
  onCopyCapture: PropTypes.func,
  onCut: PropTypes.func,
  onCutCapture: PropTypes.func,
  onPaste: PropTypes.func,
  onPasteCapture: PropTypes.func,

  // Composition Events
  onCompositionEnd: PropTypes.func,
  onCompositionEndCapture: PropTypes.func,
  onCompositionStart: PropTypes.func,
  onCompositionStartCapture: PropTypes.func,
  onCompositionUpdate: PropTypes.func,
  onCompositionUpdateCapture: PropTypes.func,

  // Focus Events
  onFocus: PropTypes.func,
  onFocusCapture: PropTypes.func,
  onBlur: PropTypes.func,
  onBlurCapture: PropTypes.func,

  // Form Events
  onChange: PropTypes.func,
  onChangeCapture: PropTypes.func,
  onBeforeInput: PropTypes.func,
  onBeforeInputCapture: PropTypes.func,
  onInput: PropTypes.func,
  onInputCapture: PropTypes.func,
  onReset: PropTypes.func,
  onResetCapture: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitCapture: PropTypes.func,
  onInvalid: PropTypes.func,
  onInvalidCapture: PropTypes.func,

  // Image Events
  onLoad: PropTypes.func,
  onLoadCapture: PropTypes.func,
  onError: PropTypes.func,
  onErrorCapture: PropTypes.func,

  // Keyboard Events
  onKeyDown: PropTypes.func,
  onKeyDownCapture: PropTypes.func,
  /** @deprecated */
  onKeyPress: PropTypes.func,
  /** @deprecated */
  onKeyPressCapture: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyUpCapture: PropTypes.func,

  // Media Events
  onAbort: PropTypes.func,
  onAbortCapture: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayCapture: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onCanPlayThroughCapture: PropTypes.func,
  onDurationChange: PropTypes.func,
  onDurationChangeCapture: PropTypes.func,
  onEmptied: PropTypes.func,
  onEmptiedCapture: PropTypes.func,
  onEncrypted: PropTypes.func,
  onEncryptedCapture: PropTypes.func,
  onEnded: PropTypes.func,
  onEndedCapture: PropTypes.func,
  onLoadedData: PropTypes.func,
  onLoadedDataCapture: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadedMetadataCapture: PropTypes.func,
  onLoadStart: PropTypes.func,
  onLoadStartCapture: PropTypes.func,
  onPause: PropTypes.func,
  onPauseCapture: PropTypes.func,
  onPlay: PropTypes.func,
  onPlayCapture: PropTypes.func,
  onPlaying: PropTypes.func,
  onPlayingCapture: PropTypes.func,
  onProgress: PropTypes.func,
  onProgressCapture: PropTypes.func,
  onRateChange: PropTypes.func,
  onRateChangeCapture: PropTypes.func,
  onResize: PropTypes.func,
  onResizeCapture: PropTypes.func,
  onSeeked: PropTypes.func,
  onSeekedCapture: PropTypes.func,
  onSeeking: PropTypes.func,
  onSeekingCapture: PropTypes.func,
  onStalled: PropTypes.func,
  onStalledCapture: PropTypes.func,
  onSuspend: PropTypes.func,
  onSuspendCapture: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onTimeUpdateCapture: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onVolumeChangeCapture: PropTypes.func,
  onWaiting: PropTypes.func,
  onWaitingCapture: PropTypes.func,

  // MouseEvents
  onAuxClick: PropTypes.func,
  onAuxClickCapture: PropTypes.func,
  onClick: PropTypes.func,
  onClickCapture: PropTypes.func,
  onContextMenu: PropTypes.func,
  onContextMenuCapture: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDoubleClickCapture: PropTypes.func,
  onDrag: PropTypes.func,
  onDragCapture: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragEndCapture: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragEnterCapture: PropTypes.func,
  onDragExit: PropTypes.func,
  onDragExitCapture: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragLeaveCapture: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragOverCapture: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStartCapture: PropTypes.func,
  onDrop: PropTypes.func,
  onDropCapture: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseDownCapture: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseMoveCapture: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOutCapture: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOverCapture: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseUpCapture: PropTypes.func,

  // Selection Events
  onSelect: PropTypes.func,
  onSelectCapture: PropTypes.func,

  // Touch Events
  onTouchCancel: PropTypes.func,
  onTouchCancelCapture: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchEndCapture: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchMoveCapture: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchStartCapture: PropTypes.func,

  // Pointer Events
  onPointerDown: PropTypes.func,
  onPointerDownCapture: PropTypes.func,
  onPointerMove: PropTypes.func,
  onPointerMoveCapture: PropTypes.func,
  onPointerUp: PropTypes.func,
  onPointerUpCapture: PropTypes.func,
  onPointerCancel: PropTypes.func,
  onPointerCancelCapture: PropTypes.func,
  onPointerEnter: PropTypes.func,
  onPointerEnterCapture: PropTypes.func,
  onPointerLeave: PropTypes.func,
  onPointerLeaveCapture: PropTypes.func,
  onPointerOver: PropTypes.func,
  onPointerOverCapture: PropTypes.func,
  onPointerOut: PropTypes.func,
  onPointerOutCapture: PropTypes.func,
  onGotPointerCapture: PropTypes.func,
  onGotPointerCaptureCapture: PropTypes.func,
  onLostPointerCapture: PropTypes.func,
  onLostPointerCaptureCapture: PropTypes.func,

  // UI Events
  onScroll: PropTypes.func,
  onScrollCapture: PropTypes.func,

  // Wheel Events
  onWheel: PropTypes.func,
  onWheelCapture: PropTypes.func,

  // Animation Events
  onAnimationStart: PropTypes.func,
  onAnimationStartCapture: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onAnimationEndCapture: PropTypes.func,
  onAnimationIteration: PropTypes.func,
  onAnimationIterationCapture: PropTypes.func,

  // Transition Events
  onTransitionEnd: PropTypes.func,
  onTransitionEndCapture: PropTypes.func
};

export const domDefaultProps: DOMDefaultProps = {};
