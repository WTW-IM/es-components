import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';

const StripedContainerWrapper = styled.div`
  > * {
    display: block;
    padding: 20px;

    &:nth-child(even) {
      background-color: ${props => props.evenColor};
    }

    &:nth-child(odd) {
      background-color: ${props => props.oddColor};
    }
  }
`;

function StripedContainer(props) {
  const theme = useTheme();

  return (
    <StripedContainerWrapper
      oddColor={theme.colors.gray2}
      evenColor={theme.colors.gray4}
    >
      {React.Children.map(props.children, child => React.cloneElement(child))}
    </StripedContainerWrapper>
  );
}

StripedContainer.propTypes = {
  children: PropTypes.node
};

StripedContainer.defaultProps = {
  children: undefined
};

export default StripedContainer;
