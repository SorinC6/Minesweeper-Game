import React, { FC } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Reset } from './Reset';

describe('Reset button Check', () => {
  const ResetWIthDummyHandlerOnReset: FC = () => <Reset onReset={() => null} />;

  test('Should Render elements with default state', () => {
    render(<Reset onReset={() => null} />);
    expect(screen.getByText('🙂')).toBeInTheDocument();
  });

  test('On reset handler should be called', () => {
    const onReset = jest.fn();
    render(<Reset onReset={onReset} />);
    fireEvent.click(screen.getByText('🙂'));
    expect(onReset).toBeCalled();
  });

  test('Should Change state when onMouseDowon and onMuseUp events are triggerd', () => {
    render(<ResetWIthDummyHandlerOnReset />);
    fireEvent.mouseDown(screen.getByText('🙂'));
    expect(screen.getByText('😯')).toBeInTheDocument();
    fireEvent.mouseUp(screen.getByText('😯'));
    expect(screen.getByText('🙂')).toBeInTheDocument();
  });

  test('Should chnage state when mouse down and mouse leave events are happening', () => {
    render(<ResetWIthDummyHandlerOnReset />);
    fireEvent.mouseDown(screen.getByText('🙂'));
    expect(screen.getByText('😯')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText('😯'));
    expect(screen.getByText('🙂')).toBeInTheDocument();
  });
});
