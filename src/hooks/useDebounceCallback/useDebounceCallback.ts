import { useCallback, useRef, useEffect } from 'react';

import { useDebounceCallbackProps } from './useDebounceCallback.d';

export function useDebounceCallback({
  callback,
  waitTime = 500,
  options = {
    leading: false,
    trailing: true,
  },
  disableDebounce = false,
}: useDebounceCallbackProps) {
  const { leading, trailing } = options;

  const callbackRef = useRef<(...rest: never[]) => void>(callback);
  callbackRef.current = callback;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLeadingCallRef = useRef<boolean>(false);

  const debounced = useCallback((...rest: never[]) => {
    if (disableDebounce) {
      callbackRef.current(...rest);
      return;
    }

    const isLeading = leading && !isLeadingCallRef.current;
    if (isLeading) {
      callbackRef.current(...rest);
      isLeadingCallRef.current = true;
    }

    if (trailing) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        isLeadingCallRef.current = false;
        callbackRef.current(...rest);
      }, waitTime);
    }
  }, [
    waitTime,
    leading,
    trailing,
    disableDebounce,
  ]);

  useEffect(() => function clearDebounce() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return debounced;
}
