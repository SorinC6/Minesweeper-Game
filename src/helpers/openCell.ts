import { Coords, Field, CellState } from './Filed';
import { getNeigboursItems, checkItemInField } from './CellManipulator';
import { detectWin } from './detectWin';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const openCell = (coords: Coords, playerField: Field, gameField: Field): [Field, boolean, number] => {
  const { empty, hidden, bomb } = CellState;

  const [y, x] = coords;
  const gameCell = gameField[y][x];

  if (gameCell === bomb) {
    throw new Error('Game Over');
  }

  if (gameCell === empty) {
    playerField[y][x] = gameCell;

    const items = getNeigboursItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        const gameCell = gameField[y][x];
        const playerCell = playerField[y][x];

        if (gameCell === empty && playerCell === hidden) {
          [playerField] = openCell([y, x], playerField, gameField);
        }

        if (gameCell < bomb) {
          playerField[y][x] = gameCell;
        }
      }
    }
  }

  playerField[y][x] = gameCell;
  const [isSolved, flagCounter] = detectWin(playerField, gameField);

  return [playerField, isSolved, flagCounter];
};
