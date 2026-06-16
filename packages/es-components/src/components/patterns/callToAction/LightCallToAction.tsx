import React from 'react';
import CallToAction, { CallToActionProps } from './CallToAction';

const LightCallToAction = React.forwardRef<HTMLDivElement, CallToActionProps>(
  function ForwardedLightCallToAction(props, ref) {
    return <CallToAction ref={ref} {...props} isLight />;
  }
);

export default LightCallToAction;
