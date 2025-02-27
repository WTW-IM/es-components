import React from 'react';
import styled from 'styled-components';
import LoadingSkeleton, { SkeletonThemeProps } from './LoadingSkeleton';

const { Shape } = LoadingSkeleton;

const TileContainer = styled(LoadingSkeleton)`
  display: flex;
  flex-direction: column;
  margin: 17px 24px 0 14px;
`;

const HeaderFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const IconPlaceholder = styled(Shape)`
  width: 65px;
  height: 65px;
  flex-grow: 0;
  margin-right: 40px;
`;

const TitlePlaceholder = styled(Shape)`
  height: 26px;
  flex-grow: 1;
  align-self: center;
`;

const DescriptionPlaceholder = styled(Shape)`
  height: 15px;
  margin-bottom: 9px;
`;

const ButtonPlaceholder = styled(Shape)<SkeletonThemeProps>`
  width: 158px;
  height: 17px;
  align-self: flex-end;
  padding: 9px 10px;
  border: 1px solid ${({ theme: { skeleton } }) => skeleton.shapeColor};
  border-radius: 1px;
  margin-top: 10px;
  background-clip: content-box;
`;

export default function SkeletonTile() {
  return (
    <TileContainer>
      <HeaderFlex>
        <IconPlaceholder />
        <TitlePlaceholder />
      </HeaderFlex>
      <DescriptionPlaceholder />
      <DescriptionPlaceholder />
      <ButtonPlaceholder />
    </TileContainer>
  );
}
