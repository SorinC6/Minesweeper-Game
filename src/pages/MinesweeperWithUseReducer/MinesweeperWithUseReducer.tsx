import React, { FC } from 'react';
import { Top } from '../../components/Top';
import { GameLayout } from '../../components/Game/GameLayout';

import { GameWithUseReducer } from '@/settings/GameWIthRedux';

export const MinesweeperWithUseReducer: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with React+Redux and useReducer
        </Top>
      }
    >
      <GameWithUseReducer />
    </GameLayout>
  );
};
