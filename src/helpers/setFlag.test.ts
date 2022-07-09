import { CellState, Field } from './Filed';
import { setFlag } from './setFlag';

const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

describe('Set flag action', () => {
  it('Set flag to the non hidden cell should be ignored', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];
    const playerField: Field = [
      [1, h, h],
      [h, h, h],
      [h, h, h],
    ];

    const [newPlayerField] = setFlag([0, 0], playerField, gameField, 0, 3);

    expect(newPlayerField).toStrictEqual([
      [1, h, h],
      [h, h, h],
      [h, h, h],
    ]);
  });
  it('Set Flag action, simple 3*3 case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [h, h, h],
      [h, h, h],
      [h, h, h],
    ];

    const [playerFieldAfterFirstClick] = setFlag([0, 0], playerField, gameField, 0, 3);

    expect(playerFieldAfterFirstClick).toStrictEqual([
      [f, h, h],
      [h, h, h],
      [h, h, h],
    ]);

    const [playerFieldAfterSecondClick] = setFlag([0, 0], playerField, gameField, 0, 3);

    expect(playerFieldAfterSecondClick).toStrictEqual([
      [w, h, h],
      [h, h, h],
      [h, h, h],
    ]);

    const [playerFieldAfterThirdClick] = setFlag([0, 0], playerField, gameField, 0, 3);

    expect(playerFieldAfterThirdClick).toStrictEqual([
      [h, h, h],
      [h, h, h],
      [h, h, h],
    ]);
  });
});
