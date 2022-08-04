import React, { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Grid } from '@/components/Grid';
import { Scoreboard } from '@/components/Scoreboard';
import { GameOver } from '@/components/Game';

import { GameLevels, LevelNames } from '../GameSettings';
import { useGame } from './UseGame';

export const GameWithHooks: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlLevelParam = (searchParams.get('level') || undefined) as LevelNames;

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
  } = useGame(urlLevelParam);

  const [, bombs] = settings;

  const onChangeLevelHandler = useCallback(({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ level });
    onChangeLevel(level as LevelNames);
  }, []);

  return (
    <>
      <Scoreboard
        time={String(time)}
        levels={GameLevels as unknown as string[]}
        mines={String(bombs - flagCounter)}
        onReset={onReset}
        defaultLevel={level}
        onChangeLevel={onChangeLevelHandler}
      />
      {isGameOver && <GameOver onClick={() => null} isWin={isWin} />}
      <Grid onClick={onClick} onContextMenu={onContextMenu}>
        {playerField}
      </Grid>
    </>
  );
};
