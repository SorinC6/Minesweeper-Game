import React, { FC } from 'react';
import styled from '@emotion/styled';

interface WrapperProps {
  children: JSX.Element | JSX.Element[] | string | string[] | React.ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => <Frame>{children}</Frame>;

const Frame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
