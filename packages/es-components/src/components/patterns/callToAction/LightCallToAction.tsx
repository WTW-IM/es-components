import React from 'react';
import PropTypes from 'prop-types';
import CallToAction, { CallToActionProps } from './CallToAction';

const LightCallToAction = React.forwardRef<HTMLDivElement, CallToActionProps>(
  function ForwardedLightCallToAction(props, ref) {
    return <CallToAction ref={ref} {...props} isLight />;
  }
);

LightCallToAction.propTypes = {
  ...((CallToAction.propTypes as PropTypes.WeakValidationMap<object>) || {})
};

export default LightCallToAction;
