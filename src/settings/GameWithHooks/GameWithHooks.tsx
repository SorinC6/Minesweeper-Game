import React, { FC, useState, useMemo } from 'react';

import { Grid } from '@/components/Grid';

import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';
import { GameArea, Wrapper, GameOver } from '@/components/Game';
import { Field, emptyFieldGenerator, CellState, fieldGenerator, Coords } from '@/helpers/Filed';
import { openCell } from '@/helpers/CellManipulator';

import { GameLevels, LevelNames, GameSettings } from '../GameSettings';

export const GameWithHooks: FC = () => {
  const [level, setLevel] = useState<LevelNames>('beginner');

  const [size, bombs] = GameSettings[level];
  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));

  const gameField = useMemo(() => fieldGenerator(size, bombs / (size * size)), [size, bombs]);

  const onClick = (coords: Coords) => {
    const newPlayerField = openCell(coords, playerField, gameField);
    setPlayerField([...newPlayerField]);
  };

  const onChangeLevel = ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(level as LevelNames);
    const [size] = GameSettings[level as LevelNames];

    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
    setPlayerField([...newPlayerField]);
  };

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
          onChangeLevel={onChangeLevel}
          defaultLevel={level}
        />
        <GameOver onClick={() => null} isWin={false} />
        <Grid onClick={onClick} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
