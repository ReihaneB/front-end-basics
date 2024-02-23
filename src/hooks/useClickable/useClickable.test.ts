import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { useClickable } from './useClickable';

describe('useClickable', () => {
  jest.useFakeTimers();
  const waitTime = 300;

  it('should handle click events', () => {
    const mockOnClick = jest.fn();

    const { result } = renderHook(() => useClickable({
      onClick: mockOnClick,
    }));

    const { eventHandlers } = result.current;

    act(() => {
      eventHandlers.onClick?.();
    });

    jest.advanceTimersByTime(waitTime);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it('should handle mouse down events', () => {
    const mockOnClick = jest.fn();
    const mockOnMouseDown = jest.fn();

    const { result } = renderHook(() => useClickable({
      onClick: mockOnClick,
      onMouseDown: mockOnMouseDown,
    }));

    const { eventHandlers } = result.current;


    act(() => {
      eventHandlers.onMouseDown?.();
    });

    jest.advanceTimersByTime(waitTime);
    expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
  });
  it('should handle mouse enter events', () => {
    const mockOnClick = jest.fn();
    const mockOnMouseEnter = jest.fn();

    const { result } = renderHook(() => useClickable({
      onClick: mockOnClick,
      onMouseEnter: mockOnMouseEnter,
    }));

    const { eventHandlers } = result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.MouseEvent<Element, MouseEvent>;

    act(() => {
      eventHandlers.onMouseOver(mockEvent);
    });

    jest.advanceTimersByTime(waitTime);
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });
  it('should handle disabled state', () => {
    const mockOnClick = jest.fn();

    const { result } = renderHook(() => useClickable({
      onClick: mockOnClick,
      disabled: true,
    }));

    const { eventHandlers } = result.current;

    act(() => {
      eventHandlers.onClick?.();
    });

    jest.advanceTimersByTime(waitTime);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
  it('should handle disable debounce', () => {
    const mockOnClick = jest.fn();

    const { result } = renderHook(() => useClickable({
      onClick: mockOnClick,
      disableDebounce: true,
    }));

    const { eventHandlers } = result.current;

    act(() => {
      eventHandlers.onClick?.();
      eventHandlers.onClick?.();
      eventHandlers.onClick?.();
    });

    jest.advanceTimersByTime(waitTime);
    expect(mockOnClick).toHaveBeenCalledTimes(3);
  });
  it('should clicking multiple times will only trigger onClick once', () => {
    const mockOnClick = jest.fn();

    const { result } = renderHook(() => useClickable({
      onClick: mockOnClick,
    }));

    const { eventHandlers } = result.current;

    act(() => {
      eventHandlers.onClick?.();
      eventHandlers.onClick?.();
      eventHandlers.onClick?.();
    });

    jest.advanceTimersByTime(waitTime);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it('should handle default props', () => {
    const mockOnClick = jest.fn();
    const { result } = renderHook(() => useClickable({ onClick: mockOnClick }));

    const { eventHandlers } = result.current;

    const mockEventMouseEnter = {
      preventDefault: jest.fn(),
    } as unknown as React.MouseEvent<Element, MouseEvent>;

    act(() => {
      eventHandlers.onClick?.();
      eventHandlers.onMouseDown?.();
      eventHandlers.onMouseOver?.(mockEventMouseEnter);
    });

    expect(eventHandlers.onClick).toBeDefined();
    expect(eventHandlers.onMouseDown).toBeDefined();
    expect(eventHandlers.onMouseOver).toBeDefined();
  });
});
