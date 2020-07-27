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
  flex-grow: 0;
  height: 65px;
  margin-right: 40px;
  width: 65px;
`;

const TitlePlaceholder = styled(Shape)`
  align-self: center;
  flex-grow: 1;
  height: 26px;
`;

const DescriptionPlaceholder = styled(Shape)`
  height: 15px;
  margin-bottom: 9px;
`;

const ButtonPlaceholder = styled(Shape)`
  align-self: flex-end;
  background-clip: content-box;
  border: 1px solid ${({ theme: { skeleton } }) => skeleton.shapeColor};
  border-radius: 1px;
  height: 17px;
  margin-top: 10px;
  padding: 9px 10px;
  width: 158px;
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
