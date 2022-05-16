import React, { FC } from "react";
import styled from "@emotion/styled";

export const Legend: FC = () => {
  return (
    <Parent>
      <strong>flag: </strong>
      <code>
        <Key>CTRL</Key> + <Click>click</Click>
      </code>
    </Parent>
  );
};

export const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;

export const Key = styled.span`
  color: red;
`;

export const Click = styled.span`
  color: blue;
`;

export default Legend;
