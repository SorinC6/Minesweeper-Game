import { useState } from 'react';

import { Field, emptyFieldGenerator, CellState, fieldGenerator, Coords } from '@/helpers/Filed';
import { openCell } from '@/helpers/openCell';

import { LevelNames, GameSettings } from '../GameSettings';
import { setFlag } from '@/helpers/setFlag';
import { useTime } from './useTime';

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

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>('beginner');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [flagCounter, setFlagCounter] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [time, resetTime] = useTime(isGameStarted, isGameOver);

  const [size, bombs] = GameSettings[level];
  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));
  const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs / (size * size)));

  console.log('gameField', gameField);

  const setGameOver = (isSolved = false) => {
    setIsGameOver(true);
    setIsWin(isSolved);
  };

  const onClick = (coords: Coords) => {
    !isGameStarted && setIsGameStarted(true);
    try {
      const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);
      if (isSolved) {
        setGameOver(isSolved);
      }
      setPlayerField([...newPlayerField]);
    } catch (error) {
      setPlayerField([...gameField]);
      setGameOver();
    }
  };

  const onChangeLevel = (level: LevelNames) => {
    setLevel(level);
    const newSettings = GameSettings[level];
    resetHandle(newSettings);
  };

  const resetHandle = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
    setGameField([...newGameField]);
    setPlayerField([...newPlayerField]);
    setIsGameOver(false);
    setIsWin(false);
    setIsGameStarted(false);
    resetTime();
  };

  const onReset = () => resetHandle([size, bombs]);

  const onContextMenu = (coords: Coords) => {
    !isGameStarted && setIsGameStarted(true);
    const [newPlayerField, isSolved, newFlagCounter] = setFlag(coords, playerField, gameField, flagCounter, bombs);
    setFlagCounter(newFlagCounter);
    if (isSolved) {
      setGameOver(isSolved);
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
