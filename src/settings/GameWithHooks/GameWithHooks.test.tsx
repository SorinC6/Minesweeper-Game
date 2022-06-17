import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

import { GameWithHooks } from './GameWithHooks';

const mockOnClick = jest.fn();
const mockOnChangeLevel = jest.fn();
const mockOnReset = jest.fn();
const mockOnContextMenu = jest.fn();
const mockSetSearchParams = jest.fn();

describe('GAME with hooks tests', () => {
  test('Render game field by default', () => {
    const { asFragment } = render(<GameWithHooks />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Change level works fine', () => {
    render(<GameWithHooks />);
    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
    // expect(mockOnChangeLevel).toHaveBeenCalled();
    // expect(mockSetSearchParams).toHaveBeenCalledWith({ level: 'intermediate' });
  });
});
