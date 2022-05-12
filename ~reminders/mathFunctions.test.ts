import { add, mul } from "./mathFunctions";

// testing Jest to see if the instalation works

describe("MATC FUNCTION TEST ", () => {
  it("CHECK FUNCTION", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("CHECK MUL function", () => {
    expect(mul(2, 3)).toBe(6);
  });
});
