import React, { useCallback, useMemo } from 'react';

import { useDebounceCallback } from '@/hooks/useDebounceCallback/useDebounceCallback';

import { useClickableProps } from './useClickable.d';

export function useClickable({
  onClick = () => {},
  onMouseDown = () => {},
  onMouseEnter = () => {},
  disabled = false,
  disableDebounce = false,
}: useClickableProps) {
  const handleClick = useDebounceCallback({
    callback: onClick,
    waitTime: 300,
    disableDebounce,
  });

  const handleMouseDown = useDebounceCallback({
    callback: onMouseDown,
    waitTime: 300,
    disableDebounce,
  });

  const handleMouseOver = useCallback((e: React.MouseEvent<Element, MouseEvent>) => {
    onMouseEnter?.(e);
  }, [onMouseEnter]);

  return useMemo(() => ({
    eventHandlers: {
      onClick: !disabled ? handleClick : undefined,
      onMouseDown: !disabled ? handleMouseDown : undefined,
      onMouseOver: handleMouseOver,
    },
  }), [
    handleClick,
    handleMouseDown,
    handleMouseOver,
  ]);
}
