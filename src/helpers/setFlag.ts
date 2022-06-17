import { Coords, Field, CellState } from './Filed';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {[Field,FlagCounter]}
 */
export const setFlag = (coords: Coords, playerField: Field, gameField: Field): Field => {
  const [y, x] = coords;
  con;
  const { empty, hidden, bomb } = CellState;

  return [[]];
};
