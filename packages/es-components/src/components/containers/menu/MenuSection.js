import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint-disable no-confusing-arrow */
const StyledMenuSection = styled.section`
  padding-top: ${props =>
    !props.isFirst && !props.inline && !props.isOnlySection ? '20px' : '0px'};
  padding-bottom: ${props => (props.isLast ? '0px' : '20px')};
  border-bottom: ${props =>
    !props.isLast && !props.inline
      ? `1px solid ${props.theme.colors.gray5}`
      : 'none'};
`;
/* eslint-enable */

const StyledHeader = styled.header`
  padding-left: 10px;
`;

const StyledChildrenContainer = styled.section`
  padding: 15px 20px 0px 20px;
`;

const MenuSection = (props, context) => {
  const { title, children, isLast, isFirst, isOnlySection } = props;
  const { inline } = context;

  return (
    <StyledMenuSection
      className="es-menu__section"
      isLast={isLast}
      isFirst={isFirst}
      inline={inline}
      isOnlySection={isOnlySection}
    >
      <StyledHeader aria-label={title}>{title}</StyledHeader>
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
  isFirst: PropTypes.bool,
  isOnlySection: PropTypes.bool
};

MenuSection.defaultProps = {
  title: null,
  children: null,
  isLast: false,
  isFirst: false,
  isOnlySection: false
};

export default MenuSection;
