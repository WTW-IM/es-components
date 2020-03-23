import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import Icon from '../../base/icons/Icon';
import Label from '../../controls/label/Label';
import { PromptType } from './PromptType';

const IconWrapper = styled.div`
  background-color: ${promptProps => promptProps.bannerBgColor};
  padding: 6px 0px 0px 6px;
`;

const StyledIcon = styled(Icon)`
  name: ${promptProps => promptProps.iconName};
  color: ${promptProps => promptProps.iconColor};
  padding-right: 5px;
  @media (min-width: 768) {
    display: inline;
    margin-right: 8px;
  }
`;

const ContentWrapper = styled.div`
  align-items: center;
  background-color: ${promptProps => promptProps.bgColor};
  border-radius: 2px;
  color: ${promptProps => promptProps.textColor};
  display: block;
  margin-bottom: 25px;
  padding: 15px;
`;

const Content = styled.div`
  align-self: center;
  word-break: break-word;
`;

const ReadAloudLabel = styled(Label)`
  letter-spacing: 0.5px;
  font-size: 20px;
  font-weight: 500;
  color: black;
`;

const DoNotReadAloudLabel = styled(Label)`
  font-weight: semi-bold;
  font-size: 18px;
  color: black;
`;

const Prompt = props => {
  const { type, children } = props;
  const theme = useTheme();
  const promptStyles = theme.promptStyles[type];
  const inlineIconText =
    type === PromptType.ReadAloud ? (
      <ReadAloudLabel>Read Aloud</ReadAloudLabel>
    ) : (
      <DoNotReadAloudLabel>Do Not Read Aloud</DoNotReadAloudLabel>
    );
  return (
    <React.Fragment>
      <IconWrapper type={type} bannerBgColor={promptStyles.bannerBgColor}>
        <StyledIcon
          name={promptStyles.iconName}
          iconColor={promptStyles.iconColor}
          size={30}
        />
        {inlineIconText}
      </IconWrapper>
      <ContentWrapper
        bgColor={promptStyles.bgColor}
        color={promptStyles.textColor}
      >
        <Content>{children}</Content>
      </ContentWrapper>
    </React.Fragment>
  );
};

Prompt.defaultProps = {
  children: null
};

Prompt.propTypes = {
  type: PropTypes.oneOf([PromptType.ReadAloud, PromptType.DoNotReadAloud])
    .isRequired,
  children: PropTypes.node
};

export default Prompt;
