import React from 'react';
import styled from 'styled-components';
import LightNotification from '../../containers/notification/LightNotification';

import { getCallToActionChildren } from './getCallToActionChildren';

const Container = styled.div`
  flex-basis: 100%;
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function LightCallToAction({ children, ...rest }) {
  const { actions, nonActions } = getCallToActionChildren(children, 'light');
  const props = { ...rest, isDismissable: false };
  return (
    <LightNotification {...props}>
      <Container>
        {nonActions}
        <CallToActionContainer>{actions}</CallToActionContainer>
      </Container>
    </LightNotification>
  );
}

export default LightCallToAction;
