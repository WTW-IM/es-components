import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DismissButton from '../../controls/DismissButton';

const StyledPanel = styled.div`
  background-color: ${props => props.theme.colors.grayLighter};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  z-index: 10;
`;

const StyledDismissButton = styled(DismissButton)`
  float: right;
`;

const Spacer = styled.div`
  padding-bottom: 35px;
`;

const StyledChildrenContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  flex-wrap: wrap;
`;

const MenuPanel = (props, context) => {
  const { children, isOpen, closeFunction } = props;
  return (
    <StyledPanel isOpen={isOpen} className="menu-panel" t>
      <Spacer>
        <StyledDismissButton onClick={closeFunction} />
      </Spacer>
      <StyledChildrenContainer inline={context.inline}>
        {children}
      </StyledChildrenContainer>
    </StyledPanel>
  );
};

MenuPanel.propTypes = {
  children: PropTypes.any.isRequired,
  isOpen: PropTypes.bool,
  closeFunction: PropTypes.func.isRequired,
  theme: PropTypes.object
};

MenuPanel.contextTypes = {
  inline: PropTypes.bool
};

export default MenuPanel;
