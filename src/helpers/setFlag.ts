import { detectWin } from './DetectWin';
import { Coords, Field, CellState } from './Filed';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @param {number} prevFlagCounter
 * @param {number} bombs
 * @returns {[Field,boolean, number]}
 */
export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field,
  prevFlagCounter: number,
  bombs: number
): [Field, boolean, number] => {
  const [y, x] = coords;
  const cell = playerField[y][x];
  const { flag, weakFlag, hidden } = CellState;

  switch (cell) {
    case flag:
      playerField[y][x] = weakFlag;
      break;
    case weakFlag:
      playerField[y][x] = hidden;
      break;
    case hidden:
      if (prevFlagCounter < bombs) {
        playerField[y][x] = flag;
      }
      break;
  }

  const [isSolved, flagCounter] = detectWin(playerField, gameField);

  return [playerField, isSolved, flagCounter];
};
