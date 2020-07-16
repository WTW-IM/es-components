import React from 'react';
import styled from 'styled-components';

const TileFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 17px 24px 0 14px;
`;

const HeaderFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const IconPlaceholder = styled.div`
  height: 65px;
  width: 65px;
  flex-grow: 0;
  background-color: ${props => props.theme.colors.gray3};
  margin-right: 40px;
`;

const TitlePlaceholder = styled.div`
  height: 26px;
  flex-grow: 1;
  align-self: center;
  background-color: ${props => props.theme.colors.gray3};
`;

const DescriptionPlaceholder = styled.div`
  height: 15px;
  background-color: ${props => props.theme.colors.gray3};
  margin-bottom: 9px;
`;

const ButtonPlaceholder = styled.div`
  height: 17px;
  width: 158px;
  padding: 9px 10px;
  background-color: ${props => props.theme.colors.gray3};
  background-clip: content-box;
  border: 1px solid ${props => props.theme.colors.gray5};
  border-radius: 1px;
  align-self: flex-end;
  margin-top: 10px;
`;

function SkeletonTile() {
  return (
    <TileFlex>
      <HeaderFlex>
        <IconPlaceholder />
        <TitlePlaceholder />
      </HeaderFlex>
      <DescriptionPlaceholder />
      <DescriptionPlaceholder />
      <ButtonPlaceholder />
    </TileFlex>
  );
}

export default SkeletonTile;
