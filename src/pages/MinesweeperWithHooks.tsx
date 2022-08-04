import React, { FC } from 'react';
import { Top } from '../components/Top';
import { GameLayout } from '../components/Game/GameLayout';

import { GameWithHooks } from '@/settings/GameWithHooks';

const MinesweeperWithHooks: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="ctrl" secondAction="click">
          Minesweeper with React Hooks
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  );
};

export default MinesweeperWithHooks;
