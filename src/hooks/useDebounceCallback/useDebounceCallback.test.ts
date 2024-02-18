import { renderHook, act } from '@testing-library/react';

import { useDebounceCallback } from './useDebounceCallback';

describe('useDebounceCallback', () => {
  jest.useFakeTimers();
  const waitTime = 300;

  it('calls the callback after the wait time', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      waitTime,
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(waitTime);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls the callback only once after multiple calls', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      waitTime,
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(waitTime / 2);
      result.current();
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(waitTime / 2);
    });

    expect(callback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(waitTime / 2);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls the callback immediately if leading is true', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      options: { leading: true },
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls the callback after the wait time if trailing is true', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      waitTime,
      options: { trailing: true },
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(waitTime);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(waitTime);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback if both leading and trailing are false', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      waitTime,
      options: { leading: false, trailing: false },
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(waitTime);
    });

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('does call 2 times the callback if both leading and trailing are true', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      waitTime,
      options: { leading: true, trailing: true },
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(waitTime);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('calls the callback immediately if disableDebounce is true', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounceCallback({
      callback,
      waitTime,
      disableDebounce: true,
    }));

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(4);
  });
});
