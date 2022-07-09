import React, { FC } from 'react';

import { Grid } from '@/components/Grid';

import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';
import { GameArea, Wrapper, GameOver } from '@/components/Game';

import { GameLevels, LevelNames } from '../GameSettings';

import { useGame } from './UseGame';

export const GameWithHooks: FC = () => {
  const {
    level,
    time,
    flagCounter,
    isGameOver,
    isWin,
    settings,
    playerField,
    onClick,
    onChangeLevel,
    onReset,
    onContextMenu,
  } = useGame();

  const [, bombs] = settings;

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time={String(time)}
          levels={GameLevels as unknown as string[]}
          mines={String(bombs - flagCounter)}
          onReset={onReset}
          defaultLevel={level}
          onChangeLevel={({ target: { value: level } }) => {
            onChangeLevel(level as LevelNames);
          }}
        />
        {isGameOver && <GameOver onClick={() => null} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
