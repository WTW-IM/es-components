import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InlineContext } from './InlineContext';

export type MenuSectionProps = {
  title?: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  isOnlySection?: boolean;
  openButtonType?: string;
  inline?: boolean;
  [x: string]: any;
};

type SectionProps = {
  isFirst?: boolean;
  inline?: boolean;
  isOnlySection?: boolean;
  isLast?: boolean;
  theme: {
    colors: { gray5: string };
  };
};

const StyledMenuSection = styled.section<SectionProps>`
  padding-top: ${props =>
    !props.isFirst && !props.inline && !props.isOnlySection ? '20px' : '0px'};
  padding-bottom: ${props => (props.isLast ? '0px' : '20px')};
  border-bottom: ${props =>
    !props.isLast && !props.inline
      ? `1px solid ${props.theme.colors.gray5}`
      : 'none'};
`;

const StyledHeader = styled.header`
  padding-left: 10px;
`;

const StyledChildrenContainer = styled.section`
  padding: 15px 20px 0px 20px;
`;

function MenuSection(props: MenuSectionProps) {
  const { title, children, isLast, isFirst, isOnlySection, ...other } = props;
  const inline = useContext(InlineContext);

  return (
    <StyledMenuSection
      isLast={isLast}
      isFirst={isFirst}
      inline={inline}
      isOnlySection={isOnlySection}
      {...other}
    >
      {title && <StyledHeader aria-label={title}>{title}</StyledHeader>}
      {children && (
        <StyledChildrenContainer>{children}</StyledChildrenContainer>
      )}
    </StyledMenuSection>
  );
}

MenuSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  isLast: PropTypes.bool,
  isFirst: PropTypes.bool,
  isOnlySection: PropTypes.bool
};

MenuSection.defaultProps = {
  title: undefined,
  children: undefined,
  isLast: false,
  isFirst: false,
  isOnlySection: false
};

export default MenuSection;
