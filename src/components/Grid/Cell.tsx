import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Cell as CellType, CellState, Coords } from '@/helpers/Filed';
import { useMouseDown } from '@/hooks/useMouseDown';

export interface CellProps {
  /**
   * Cell status based on the CellType
   */
  children: CellType;
  //   /**
  //    * Cell coordinates
  //    */
  coords: Coords;
  //   /**
  //    * onClick by cell handler
  //    */
  onClick: (coords: Coords) => void;
  //   /**
  //    * onContextMenu by cell handler
  //    */
  onContextMenu: (coords: Coords) => void;
}

export const checkCellIsActive = (cell: CellType) =>
  [CellState.hidden, CellState.flag, CellState.weakFlag].includes(cell);

export const Cell: FC<CellProps> = ({ children, coords, ...rest }) => {
  const [mousedown, setMouseDown, setMouseUp] = useMouseDown();
  const isActiveCell = checkCellIsActive(children);

  const onClick = () => {
    if (isActiveCell) {
      rest.onClick(coords);
    }
  };

  const onContextMenu = (elem: React.MouseEvent<HTMLDivElement>) => {
    elem.preventDefault();

    if (isActiveCell) {
      rest.onContextMenu(coords);
    }
  };

  const onMouseDown = () => {
    if (isActiveCell) {
      setMouseDown();
    }
  };

  const onMouseUp = () => {
    if (isActiveCell) {
      setMouseUp();
    }
  };

  const props = {
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp,
    onMouseLeave: onMouseUp,
    mousedown,
    'data-testid': `${children}_${coords}`,
  };

  return <ComponentsMap {...props}>{children}</ComponentsMap>;
};

interface ComponentsMapProps {
  children: CellType;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  'data-testid'?: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  mousedown: boolean;
}

const ComponentsMap: FC<ComponentsMapProps> = ({ children, ...rest }) => {
  switch (children) {
    case CellState.bomb:
      return (
        <BombFrame {...rest}>
          <Bomb />
        </BombFrame>
      );
    case CellState.hidden:
      return <ClosedFrame {...rest}>{children}</ClosedFrame>;
    case CellState.flag:
      return (
        <ClosedFrame {...rest}>
          <Flag>{children}</Flag>
        </ClosedFrame>
      );
    case CellState.weakFlag:
      return (
        <ClosedFrame {...rest}>
          <WeakFlag />
        </ClosedFrame>
      );
    default:
      return <RevealedFrame {...rest}>{children}</RevealedFrame>;
  }
};

interface ClosedFrameProps {
  mousedown?: boolean;
}

const transparent = 'rgba(0,0,0,0)';
const colors: { [key in CellType]: string } = {
  0: transparent,
  1: '#2a48ec',
  2: '#2bb13d',
  3: '#ec6561',
  4: '#233db7',
  5: '#a6070f',
  6: '#e400af',
  7: '#906a02',
  8: '#fa0707',
  9: transparent,
  10: transparent,
  11: transparent,
  12: transparent,
};

export const ClosedFrame = styled.div<ClosedFrameProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 3vh;
  height: 3vh;
  color: transparent;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: ${({ mousedown = false }) => (mousedown ? 'transparent' : 'white #9e9e9e #9e9e9e white')};
  &:hover {
    filter: brightness(1.1);
  }
`;

const RevealedFrame = styled(ClosedFrame)`
  border-color: #dddddd;
  cursor: default;
  color: ${({ children }) => colors[children as CellType] ?? transparent};
  &:hover {
    filter: brightness(1);
  }
`;

const Bomb = styled.div`
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  background-color: #333;
`;

const BombFrame = styled(RevealedFrame)`
  background-color: #ec433c;
`;

const Flag = styled.div`
  width: 0px;
  height: 0px;
  color: ${transparent};
  border-top: 1vh solid transparent;
  border-bottom: 1vh solid transparent;
  border-left: 1vh solid #ec433c;
`;

const WeakFlag = styled(Flag)`
  border-left: 1vh solid #f19996;
`;
