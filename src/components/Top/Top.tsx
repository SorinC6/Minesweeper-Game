import React, { FC } from "react";
import styled from "@emotion/styled";
import { Legend, LegendProps } from "./Legend";
import { GameName, GameNameProps } from "./GameName";

export type TopComponentType = LegendProps & GameNameProps;

export const Top: FC<TopComponentType> = ({ children, ...legendProps }) => {
  return (
    <Header>
      <GameName>{children}</GameName>
      <Legend {...legendProps} />
    </Header>
  );
};

export default Legend;

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
