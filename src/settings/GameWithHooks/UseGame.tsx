import { useState } from 'react';

import { Field, emptyFieldGenerator, CellState, fieldGenerator, Coords } from '@/helpers/Filed';
import { openCell } from '@/helpers/openCell';

import { LevelNames, GameSettings } from '../GameSettings';
import { setFlag } from '@/helpers/setFlag';

interface ReturnType {
  level: LevelNames;
  isGameOver: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
  gameField: Field;
}

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>('beginner');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const [size, bombs] = GameSettings[level];
  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));
  const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs / (size * size)));

  console.log('gameField', gameField);

  const onClick = (coords: Coords) => {
    try {
      const [newPlayerField, isSolved, flagCounter] = openCell(coords, playerField, gameField);
      if (isSolved) {
        setIsWin(true);
        setIsGameOver(true);
      }
      setPlayerField([...newPlayerField]);
    } catch (error) {
      setPlayerField([...gameField]);
      setIsGameOver(true);
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
  };

  const onReset = () => resetHandle([size, bombs]);

  const onContextMenu = (coords: Coords) => {
    const [newPlayerField, isSolved, flagCounter] = setFlag(coords, playerField, gameField);
    if (isSolved) {
      setIsWin(true);
      setIsGameOver(true);
    }
    setPlayerField([...newPlayerField]);
  };

  return {
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
  };
};
