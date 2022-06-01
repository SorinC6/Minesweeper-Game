import { renderHook, act } from '@testing-library/react-hooks';
import { useMouseDown } from './useMouseDown';

describe('useMousedown hook test', () => {
  test('Should toggle state from the useMouseDOwn hook', () => {
    const { result } = renderHook(useMouseDown);

    const [mousedown, onMouseDown, onMouseUp] = result.current;

    expect(mousedown).toBe(false);

    expect(mousedown).toBe(false);

    act(onMouseDown);
    expect(result.current[0]).toBe(true);
    act(onMouseUp);
    expect(result.current[0]).toBe(false);
  });
});
