import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';

import { CellState, Cell as CellType, Coords } from '@/helpers/Filed';

import { Cell, checkCellIsActive } from './Cell';

describe('Cell component tests', () => {
  const coords: Coords = [1, 1];

  for (let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
    test('Check prevenit default context menu for every type of cell', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };
      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);
      const contextMenuEvent = createEvent.contextMenu(cellComp);

      fireEvent(cellComp, contextMenuEvent);
      expect(contextMenuEvent.defaultPrevented).toBe(true);
    });

    test('on click and on context menu should be called for active cells', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };
      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);

      fireEvent.click(cellComp);
      fireEvent.contextMenu(cellComp);

      if (checkCellIsActive(cell)) {
        expect(props.onClick).toBeCalled();
        expect(props.onContextMenu).toBeCalled();
      } else {
        expect(props.onClick).not.toBeCalled();
        expect(props.onContextMenu).not.toBeCalled();
      }
    });
  }
});
