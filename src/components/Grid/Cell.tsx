import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Cell as CellType, CellState } from '@/helpers/Filed';

export interface CellProps {
  /**
   * Cell status based on the CellType
   */
  children: CellType;
  //   /**
  //    * Cell coordinates
  //    */
  //   coords: Coords;
  //   /**
  //    * onClick by cell handler
  //    */
  //   onClick: (coords: Coords) => void;
  //   /**
  //    * onContextMenu by cell handler
  //    */
  //   onContextMenu: (coords: Coords) => void;
}

export const Cell: FC<CellProps> = ({ children }) => {
  switch (children) {
    case CellState.empty:
      return <RevealedFrame />;
    case CellState.bomb:
      return (
        <BombFrame>
          <Bomb />
        </BombFrame>
      );
    case CellState.flag:
      return (
        <ClosedFrame>
          <Flag />
        </ClosedFrame>
      );
    case CellState.weakFlag:
      return (
        <ClosedFrame>
          <WeakFlag />
        </ClosedFrame>
      );
    case CellState.hidden:
      return <ClosedFrame />;
    default:
      return <RevealedFrame>{children}</RevealedFrame>;
  }
};

interface ClosedFrameProps {
  mouseDown?: boolean;
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
  width: 2.8vh;
  height: 2.8vh;
  color: transparent;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: ${({ mouseDown = false }) => (mouseDown ? 'transparent' : 'white #9e9e9e #9e9e9e white')};
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