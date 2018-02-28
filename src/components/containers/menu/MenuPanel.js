import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme/defaultTheme';
import DismissButton from '../../controls/DismissButton';

const StyledPanel = styled.div`
  background-color: ${props => props.theme.colors.grayLight};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  padding-bottom: 30px;
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
    <ThemeProvider theme={defaultTheme}>
      <StyledPanel isOpen={isOpen}>
        <Spacer>
          <StyledDismissButton onClick={closeFunction} />
        </Spacer>
        <StyledChildrenContainer inline={context.inline}>
          {children}
        </StyledChildrenContainer>
      </StyledPanel>
    </ThemeProvider>
  );
};

MenuPanel.propTypes = {
  children: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeFunction: PropTypes.func.isRequired
};
MenuPanel.contextTypes = {
  inline: PropTypes.bool
};

export default MenuPanel;
