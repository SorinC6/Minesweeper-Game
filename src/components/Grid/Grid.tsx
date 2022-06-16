import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Field, Coords } from '@/helpers/Filed';
import { Cell } from './Cell';

export interface GridProps {
  children: Field;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
}

export const Grid: FC<GridProps> = ({ children, ...rest }) => {
  return (
    <Wrapper size={children.length}>
      {children.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <Cell key={`${x}-${y}`} coords={[y, x]} {...rest}>
              {cell}
            </Cell>
          );
        });
      })}
    </Wrapper>
  );
};

interface WrapperProps {
  size: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, auto);
  width: max-content;
  padding: 1vw;
`;
