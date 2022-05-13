import { Cell, Coords, Field } from "./Filed";

export const getNeigboursItems = ([x, y]: Coords): Record<
  string,
  [number, number]
> => {
  return {
    top: [y - 1, x],
    topRight: [y - 1, x + 1],
    right: [y, x + 1],
    rightBottom: [y + 1, x + 1],
    bottom: [y + 1, x],
    bottomLeft: [y + 1, x - 1],
    left: [y, x - 1],
    leftTop: [y - 1, x - 1],
  };
};

export const incrementNeibours = (coords: Coords, field: Field): Field => {
  const items = getNeigboursItems(coords);

  for (let item of Object.values(items)) {
    if (checkItemInField(item, field)) {
      const [y, x] = item;
      const cell = field[y][x];
      if (cell < 8) {
        field[y][x] = (cell + 1) as Cell;
      }
    }
  }

  return field;
};

export const checkItemInField = (
  [y, x]: Coords,
  { length }: Field
): boolean => {
  return y >= 0 && x >= 0 && length - y > 0 && length - x > 0;
};
