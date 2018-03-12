import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMenuSection = styled.div`
  padding-top: ${props => (!props.isFirst && !props.inline ? '20px' : '0px')};
  padding-bottom: ${props => (props.isLast ? '0px' : '20px')};
  border-bottom: ${props =>
    !props.isLast && !props.inline
      ? `1px solid ${props.theme.colors.gray}`
      : 'none'};
`;

const StyledHeader = styled.div`
  padding-left: 10px;
`;

const StyledChildrenContainer = styled.div`
  padding: 15px 20px 0px 20px;
`;

const MenuSection = (props, context) => {
  const { title, children, isLast, isFirst } = props;
  const { inline } = context;

  return (
    <StyledMenuSection isLast={isLast} isFirst={isFirst} inline={inline}>
      <StyledHeader>{title}</StyledHeader>
      <StyledChildrenContainer>{children}</StyledChildrenContainer>
    </StyledMenuSection>
  );
};

MenuSection.contextTypes = {
  inline: PropTypes.bool
};

MenuSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  isLast: PropTypes.bool,
  isFirst: PropTypes.bool
};

export default MenuSection;
