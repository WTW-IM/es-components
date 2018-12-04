import React from 'react';
import styled from 'styled-components';
import Notification from '../../containers/notification/Notification';

import { getCallToActionChildren } from './getCallToActionChildren';

const Container = styled.div`
  flex-basis: 100%;
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function CallToAction({ children, ...rest }) {
  const { actions, nonActions } = getCallToActionChildren(children);
  const props = { ...rest, isDismissable: false };
  return (
    <>
      <Notification {...props}>
        <Container>{nonActions}</Container>
      </Notification>
      <CallToActionContainer>{actions}</CallToActionContainer>
    </>
  );
}

export default CallToAction;
