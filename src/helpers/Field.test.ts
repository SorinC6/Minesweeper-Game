import { emptyFieldGenerator, filedGenerator, CellState } from "./Filed";

const { empty, bomb, hidden } = CellState;

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
      expect(() => filedGenerator(1, -1)).toThrow(errorText);
      expect(() => filedGenerator(1, 2)).toThrow(errorText);
    });
    test("smallest possible field without mine", () => {
      expect(filedGenerator(1, 0)).toStrictEqual([[empty]]);
    });
    test("big field without mine", () => {
      expect(filedGenerator(5, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
      ]);
    });
    test("smallest possible field with mine", () => {
      expect(filedGenerator(1, 1)).toStrictEqual([[bomb]]);
    });
    test("2*2 fileds with mine", () => {
      expect(filedGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });
    test("Case 1 2*2 fileds 50% probilility to be mine", () => {
      expect(filedGenerator(2, 0.5)).toStrictEqual([
        [bomb, bomb],
        [empty, empty],
      ]);
    });
    test("Case 1 4*4 fileds 50% probilility to be mine", () => {
      expect(filedGenerator(4, 0.5)).toStrictEqual([
        [bomb, bomb, bomb, bomb],
        [bomb, bomb, bomb, bomb],
        [empty, empty, empty, empty],
        [empty, empty, empty, empty],
      ]);
    });
    it(" CASE2 : 2*2 field with 50% probability", () => {
      const field = filedGenerator(2, 0.5);
      const flatField = field.flat();

      const cellWithBombs = flatField.filter((cell) => cell === bomb);
      const emptyCell = flatField.filter((cell) => cell === empty);

      expect(cellWithBombs).toHaveLength(2);
      expect(emptyCell).toHaveLength(2);
    });
  });
});
