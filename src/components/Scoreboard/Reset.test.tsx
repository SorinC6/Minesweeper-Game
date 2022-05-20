import React, { FC, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Reset } from './Reset';

describe('Reset button Check', () => {
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
});
