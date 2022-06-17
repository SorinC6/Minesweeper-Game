import React, { FC, useState } from 'react';

import { Grid } from '@/components/Grid';

import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';
import { GameArea, Wrapper, GameOver } from '@/components/Game';
import { Field, emptyFieldGenerator, CellState } from '@/helpers/Filed';

import { GameLevels, LevelNames, GameSettings } from '../GameSettings';

export const GameWithHooks: FC = () => {
  const [level, setLevel] = useState<LevelNames>('beginner');

  const [size, bomb] = GameSettings[level];

  const playerField = emptyFieldGenerator(size, CellState.hidden);

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="000"
          levels={GameLevels as unknown as string[]}
          mines="010"
          onReset={() => null}
          onChangeLevel={({ target: { value } }) => setLevel(value as LevelNames)}
          defaultLevel={level}
        />
        <GameOver onClick={() => null} isWin={false} />
        <Grid onClick={() => null} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
