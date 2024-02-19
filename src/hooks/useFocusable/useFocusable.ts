import { useRef, useEffect, useImperativeHandle, Ref, useCallback, MutableRefObject, RefObject } from 'react';

import { UseFocusableProps } from './useFocusable.d';

export function useFocusable(
  ref: Ref<unknown>,
  { autoFocus = false }: UseFocusableProps
) {
  const elementRef = useRef(null) as MutableRefObject<HTMLInputElement> & RefObject<HTMLInputElement>;

  useEffect(() => {
    if (autoFocus && elementRef.current) {
      elementRef.current.focus({ preventScroll: true });
    }
  }, [autoFocus]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (elementRef.current) {
        elementRef.current.focus();
      }
    },
  }));

  const setFocus = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.focus({ preventScroll: true });
    }
  }, []);

  return {
    ref: elementRef,
    setFocus,
  };
}