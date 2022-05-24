import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Cell as CellType } from '@/helpers/Filed';

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
    case 0:
      return <EmptyFrame />;
    case 10:
      return <ClosedFrame />;
    default:
      return <ClosedFrame />;
  }
};

interface ClosedFrameProps {
  mouseDown?: boolean;
}

export const ClosedFrame = styled.div<ClosedFrameProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 1.8vh;
  height: 1.8vh;
  color: transparent;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: ${({ mouseDown = false }) => (mouseDown ? 'transparent' : 'white #9e9e9e #9e9e9e white')};
  &:hover {
    filter: brightness(1.1);
  }
`;

const EmptyFrame = styled(ClosedFrame)`
  border-color: #dddddddd;
  cursor: default;
  &:hover {
    filter: brightness(1);
  }
`;
