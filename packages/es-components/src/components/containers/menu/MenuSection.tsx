import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { InlineContext } from './InlineContext';

export type MenuSectionProps = {
  title?: string;
  children?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  isOnlySection?: boolean;
} & JSXElementProps<'section'>;

type StyledSectionProps = {
  $isFirst?: boolean;
  $inline?: boolean;
  $isOnlySection?: boolean;
  $isLast?: boolean;
};

const StyledMenuSection = styled.section<StyledSectionProps>`
  ${({ theme, $isFirst, $isLast, $inline, $isOnlySection }) => css`
    padding-top: ${!$isFirst && !$inline && !$isOnlySection ? '20px' : '0px'};
    padding-bottom: ${$isLast ? '0px' : '20px'};
    border-bottom: ${!$isLast && !$inline
      ? css`1px solid ${theme.colors.gray5}`
      : 'none'};
  `}
`;

const StyledHeader = styled.header`
  padding-left: 10px;
`;

const StyledChildrenContainer = styled.section`
  padding: 15px 20px 0px 20px;
`;

const MenuSection = React.forwardRef<HTMLElement, MenuSectionProps>(
  function MenuSection(props, ref) {
    const { title, children, isLast, isFirst, isOnlySection, ...other } = props;
    const inline = useContext(InlineContext);

    return (
      <StyledMenuSection
        ref={ref}
        $isLast={isLast}
        $isFirst={isFirst}
        $inline={inline}
        $isOnlySection={isOnlySection}
        {...other}
      >
        {title && <StyledHeader aria-label={title}>{title}</StyledHeader>}
        {children && (
          <StyledChildrenContainer>{children}</StyledChildrenContainer>
        )}
      </StyledMenuSection>
    );
  }
);

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
