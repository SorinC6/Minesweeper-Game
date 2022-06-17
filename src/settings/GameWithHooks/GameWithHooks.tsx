import React, { FC } from 'react';

import { Grid } from '@/components/Grid';

import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';
import { GameArea, Wrapper, GameOver } from '@/components/Game';

import { GameLevels, LevelNames } from '../GameSettings';

import { useGame } from '../../helpers/UseGame';

export const GameWithHooks: FC = () => {
  const { level, isGameOver, isWin, settings, playerField, onClick, onChangeLevel, onReset } = useGame();

  const [, bombs] = settings;

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="000"
          levels={GameLevels as unknown as string[]}
          mines={String(bombs)}
          onReset={onReset}
          defaultLevel={level}
          onChangeLevel={({ target: { value: level } }) => {
            onChangeLevel(level as LevelNames);
          }}
        />
        {isGameOver && <GameOver onClick={() => null} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
