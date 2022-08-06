import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithReactRedux } from '@/settings/GameWIthRedux';

export const MinesweeperWithReactRedux: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactRedux
        </Top>
      }
    >
      <GameWithReactRedux />
    </GameLayout>
  );
};
