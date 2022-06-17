import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { GameWithHooks } from './GameWithHooks';

const mockOnClick = jest.fn();
const mockOnChangeLevel = jest.fn();
const mockOnReset = jest.fn();

jest.mock('./useGame', () => ({
  __esModule: true,
  useGame: () => ({
    level: 'beginner',
    isGameOver: true,
    isWin: false,
    settings: [9, 10],
    playerField: [
      [10, 10],
      [10, 10],
    ],
    onClick: mockOnClick,
    onChangeLevel: mockOnChangeLevel,

    onReset: mockOnReset,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GameWithHooks test cases', () => {
  it('Render game field by default', () => {
    const { asFragment } = render(<GameWithHooks />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell click works fine', () => {
    render(<GameWithHooks />);
    fireEvent.click(screen.getByTestId('0,0'));
    expect(mockOnClick).toHaveBeenCalled();
  });
  it('Reset handler works fine', () => {
    render(<GameWithHooks />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnReset).toHaveBeenCalled();
  });

  it('Game over reset the game state', () => {
    render(<GameWithHooks />);
    fireEvent.click(screen.getByText('🙂'));
    expect(mockOnReset).toHaveBeenCalled();
  });
});
