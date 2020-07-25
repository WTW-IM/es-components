import React from 'react';
import styled from 'styled-components';
import LoadingSkeleton from './LoadingSkeleton';

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
  height: 65px;
  width: 65px;
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

const ButtonPlaceholder = styled(Shape)`
  height: 17px;
  width: 158px;
  padding: 9px 10px;
  background-clip: content-box;
  border: 1px solid ${({ theme: { skeleton } }) => skeleton.shapeColor};
  border-radius: 1px;
  align-self: flex-end;
  margin-top: 10px;
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
