import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface LegendProps {
  /**
   * Feature that should be activated after first+second actions
   */
  feature: string;
  /**
   * First action
   */
  firstAction: string;
  /**
   * Second action
   */
  secondAction?: string;

  children?: any;
}

export const Legend: FC<LegendProps> = ({ feature, firstAction, secondAction }) => {
  return (
    <Parent>
      <strong>{feature}: </strong>
      <FlagComboParent>
        <FirstAction>{firstAction}</FirstAction> + <SecondAction>{secondAction}</SecondAction>
      </FlagComboParent>
    </Parent>
  );
};

const FlagComboParent = styled.code`
  background: #e3e3e3;
`;

export const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;

export const FirstAction = styled.span`
  color: red;
`;

export const SecondAction = styled.span`
  color: blue;
`;

export default Legend;
