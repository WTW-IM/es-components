import React from 'react';

import Fade from '../../util/Fade';

export default function PopoverFadeTransition(props) {
  return (
    <Fade
      transitionClassOut="popover-transition-out"
      transitionClassIn="popover-transition-in"
      {...props}
    />
  );
}
