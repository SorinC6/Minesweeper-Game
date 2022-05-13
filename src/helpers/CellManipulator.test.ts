import { CellState, Field } from "./Filed";
import {
  incrementNeibours,
  getNeigboursItems,
  checkItemInField,
} from "./CellManipulator";

const { empty, bomb } = CellState;

describe("Check neighbours selectors", () => {
  describe("Simple Cases", () => {
    const field: Field = [
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
    ];

    test("Out of y range", () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });
    test("Out of x range", () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });
    test("Out of y and x range", () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });

  describe("Check neighbors Cases", () => {
    test("WITH [0,0] coords", () => {
      expect(getNeigboursItems([0, 0])).toStrictEqual({
        top: [-1, 0],
        topRight: [-1, 1],
        right: [0, 1],
        rightBottom: [1, 1],
        bottom: [1, 0],
        bottomLeft: [1, -1],
        left: [0, -1],
        leftTop: [-1, -1],
      });
    });
    test("WITH [3,3] coords", () => {
      expect(getNeigboursItems([3, 3])).toStrictEqual({
        top: [2, 3],
        topRight: [2, 4],
        right: [3, 4],
        rightBottom: [4, 4],
        bottom: [4, 3],
        bottomLeft: [4, 2],
        left: [3, 2],
        leftTop: [2, 2],
      });
    });
  });
});

describe("Check increment neibours", () => {
  describe("Simple cases", () => {
    test("Field with only one item", () => {
      expect(incrementNeibours([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
    });
    test("FILED 2*2 with one mines", () => {
      const res = incrementNeibours(
        [0, 0],
        [
          [bomb, empty],
          [empty, bomb],
        ]
      );
      expect(res).toStrictEqual([
        [bomb, 1],
        [1, bomb],
      ]);
    });
  });
});
