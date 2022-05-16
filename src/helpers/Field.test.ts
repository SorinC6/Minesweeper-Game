import { emptyFieldGenerator, CellState, Cell, fieldGenerator } from "./Filed";

const { empty, bomb, hidden } = CellState;
const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe("Field Generator", () => {
  describe("Empty field generator function test", () => {
    it("2*2", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });
    it("3*3", () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });
    it("3*3 with hidden state", () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe("simple cases", () => {
    test("Wrong decity on input", () => {
      const errorText = "probability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    test("smallest possible field without mine", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });
    test("big field without mine", () => {
      expect(fieldGenerator(5, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
      ]);
    });
    test("smallest possible field with mine", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });
    test("2*2 fileds with mine", () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });

    it("2x2 field with 50% probability", () => {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();

      console.table(field);
      console.table(flatField);

      const cellsWithBombs = flatField.filter(cellWithBombFilter);
      const emptyCells = flatField.filter((cell: Cell) => cell === 2);

      expect(cellsWithBombs).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });
  });
});
