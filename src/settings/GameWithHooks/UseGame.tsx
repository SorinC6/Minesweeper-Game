import { useState, useCallback } from 'react';

import { Field, emptyFieldGenerator, CellState, fieldGenerator, Coords } from '@/helpers/Filed';
import { openCell } from '@/helpers/openCell';

import { LevelNames } from '../GameSettings';
import { setFlag } from '@/helpers/setFlag';
import { useTime } from './useTime';
import { useStatus } from './useStatus';
import { useSettings } from './useSettings';

interface ReturnType {
  level: LevelNames;
  isGameOver: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  isGameStarted: boolean;
  onReset: () => void;
  gameField: Field;
  time: number;
  flagCounter: number;
}

export const useGame = (defaultLevel = 'beginner' as LevelNames): ReturnType => {
  const {
    settings: [size, bombs],
    level,
    setLevel,
  } = useSettings(defaultLevel);

  const [flagCounter, setFlagCounter] = useState(0);

  const { isGameStarted, isWin, isGameOver, setNewGame, setInProgress, setGameWin, setGameLoose } = useStatus();

  const [time, resetTime] = useTime(isGameStarted, isGameOver);

  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));
  const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs / (size * size)));

  console.log('gameField', gameField);

  const onClick = useCallback(
    (coords: Coords) => {
      !isGameStarted && setInProgress();
      try {
        const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);
        if (isSolved) {
          setGameWin();
        }
        setPlayerField([...newPlayerField]);
      } catch (error) {
        setPlayerField([...gameField]);
        setGameLoose();
      }
    },
    [isGameStarted, isGameOver, isWin, level, flagCounter]
  );

  const onChangeLevel = (level: LevelNames) => {
    const newSettings = setLevel(level);
    resetHandle(newSettings);
  };

  const resetHandle = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
    setGameField([...newGameField]);
    setPlayerField([...newPlayerField]);
    setNewGame();
    resetTime();
  };

  const onReset = useCallback(() => resetHandle([size, bombs]), [size, bombs]);

  const onContextMenu = (coords: Coords) => {
    !isGameStarted && setInProgress();
    const [newPlayerField, isSolved, newFlagCounter] = setFlag(coords, playerField, gameField, flagCounter, bombs);
    setFlagCounter(newFlagCounter);
    if (isSolved) {
      setGameWin();
    }
    setPlayerField([...newPlayerField]);
  };

  return {
    time,
    flagCounter,
    level,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    onClick,
    onChangeLevel,
    onReset,
    gameField,
    onContextMenu,
    isGameStarted,
  };
};
