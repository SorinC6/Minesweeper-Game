import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';
import { GameOver as GameOverComponent } from '@/components/Game';
import { actions } from '@/settings/GameWIthRedux';

export const GameOver: FC = () => {
  const { isGameOver, isWin } = useSelector(({ game: { isGameOver, isWin } }: RootState) => ({
    isGameOver,
    isWin,
  }));

  const dispatch = useDispatch();

  const onReset = useCallback(
    () => dispatch(actions.reset()),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return <>{isGameOver && <GameOverComponent onClick={onReset} isWin={isWin} />}</>;
};
