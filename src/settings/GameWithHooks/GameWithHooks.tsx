import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid } from '@/components/Grid';
import { Scoreboard } from '@/components/Scoreboard';
import { GameOver } from '@/components/Game';

import { GameLevels, LevelNames } from '../GameSettings';
import { useQuery } from '@/hooks/useQuery';
import { useGame } from './UseGame';

export const GameWithHooks: FC = () => {
  const history = useHistory();
  const query = useQuery();
  const urlLevelParam = (query.get('level') || undefined) as LevelNames;

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
    history.push({
      search: `?${new URLSearchParams({ level }).toString()}`,
    });
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
