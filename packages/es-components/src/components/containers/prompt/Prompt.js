import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import Icon from '../../base/icons/Icon';
import Label from '../../controls/label/Label';
import { PromptType } from './PromptType';

const IconWrapper = styled.div`
  background-color: ${promptProps => promptProps.bannerBgColor};
  padding: 6px 0 0 6px;
`;

const StyledIcon = styled(Icon)`
  name: ${promptProps => promptProps.iconName};
  color: ${promptProps => promptProps.iconColor};
  padding-right: 5px;
`;

const ContentWrapper = styled.div`
  align-items: center;
  background-color: ${promptProps => promptProps.bgColor};
  color: black;
  border-radius: 2px;
  display: block;
  margin-bottom: 25px;
  padding: 15px;
`;

const Content = styled.div`
  font-size: 18px;
  align-self: center;
  word-break: break-word;
`;

const BannerLabel = styled(Label)`
  letter-spacing: 0.5px;
  font-size: 20px;
  font-weight: 500;
  color: ${promptProps => promptProps.bannerTextColor};
`;

const Prompt = props => {
  const { isContentReadAloud, children } = props;
  const theme = useTheme();
  const promptStyles = isContentReadAloud
    ? theme.promptStyles[PromptType.readAloud]
    : theme.promptStyles[PromptType.doNotReadAloud];
  const inlineIconText = isContentReadAloud ? (
    <BannerLabel bannerTextColor={promptStyles.bannerTextColor}>
      Read Aloud
    </BannerLabel>
  ) : (
    <BannerLabel bannerTextColor={promptStyles.bannerTextColor}>
      Do Not Read Aloud
    </BannerLabel>
  );
  return (
    <React.Fragment>
      <IconWrapper
        bannerBgColor={promptStyles.bannerBgColor}
        textColor={promptStyles.textColor}
      >
        <StyledIcon
          name={promptStyles.iconName}
          iconColor={promptStyles.iconColor}
          size={30}
        />
        {inlineIconText}
      </IconWrapper>
      <ContentWrapper bgColor={promptStyles.bgColor}>
        <Content>{children}</Content>
      </ContentWrapper>
    </React.Fragment>
  );
};

Prompt.defaultProps = {
  isContentReadAloud: true,
  children: null
};

Prompt.propTypes = {
  isContentReadAloud: PropTypes.bool,
  children: PropTypes.node
};

export default Prompt;
