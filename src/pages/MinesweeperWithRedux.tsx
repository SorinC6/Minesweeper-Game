import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithRedux } from '@/settings/GameWIthRedux/MinesweeperWithRedux';

export const MinesweeperWithRedux: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with React+Redux and useReducer
        </Top>
      }
    >
      <GameWithRedux />
    </GameLayout>
  );
};
