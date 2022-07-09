import { Coords, Field, CellState } from './Filed';
import { getNeigboursItems, checkItemInField } from './CellManipulator';
import { detectWin } from './DetectWin';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const openCell = (coords: Coords, playerField: Field, gameField: Field): [Field, boolean] => {
  const { empty, hidden, bomb, weakFlag, flag } = CellState;
  const [y, x] = coords;
  const gameCell = gameField[y][x];
  const playerCell = playerField[y][x];

  if (gameCell === bomb) {
    throw new Error('Game Over');
  }

  if (flag === playerCell) {
    return [playerField, false];
  }

  playerField[y][x] = gameCell;

  if (gameCell === empty && [hidden, weakFlag].includes(playerCell)) {
    const items = getNeigboursItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        [playerField] = openCell([y, x], playerField, gameField);
      }
    }
  }

  const [isSolved] = detectWin(playerField, gameField);

  return [playerField, isSolved];
};
