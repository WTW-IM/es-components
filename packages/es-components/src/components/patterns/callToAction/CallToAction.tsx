import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Notification, {
  NotificationProps
} from '../../containers/notification/Notification';
import LightNotification from '../../containers/notification/LightNotification';
import { getCallToActionChildren } from './getCallToActionChildren';

export type CallToActionProps = Override<
  NotificationProps,
  {
    isLight?: boolean;
  }
>;

const Container = styled.div`
  flex-basis: 100%;
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CallToAction = React.forwardRef<HTMLDivElement, CallToActionProps>(
  function ForwardedCallToAction({ children, isLight, ...rest }, ref) {
    const { actions, nonActions } = getCallToActionChildren(children);
    const props = { ...rest, isDismissable: false };
    const withinContainerActions = isLight ? (
      <CallToActionContainer>{actions}</CallToActionContainer>
    ) : (
      <></>
    );
    const outsideContainerActions = isLight ? (
      <></>
    ) : (
      <CallToActionContainer>{actions}</CallToActionContainer>
    );

    const CTAContainer = isLight ? LightNotification : Notification;
    return (
      <>
        <CTAContainer ref={ref} {...props}>
          <Container>{nonActions}</Container>
          {withinContainerActions}
        </CTAContainer>
        {outsideContainerActions}
      </>
    );
  }
);

CallToAction.propTypes = {
  isLight: PropTypes.bool
};

export default CallToAction;
