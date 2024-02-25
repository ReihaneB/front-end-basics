import { memo } from 'react';

import { useClickable } from '@/hooks/useClickable/useClickable';
import { useFocusable } from '@/hooks/useFocusable/useFocusable';

import type { ButtonProps } from './Button.d';

function Button({
  onClick,
  children,
  disabled = false,
  disableDebounce = false,
  autoFocus = false,
  forwardedRef = null,
  ...rest
}: ButtonProps) {
  const { eventHandlers } = useClickable({
    onClick,
    disabled,
    disableDebounce,
  });

  const { ref: elementRef } = useFocusable(forwardedRef, { autoFocus });

  return (
    <button
      type="button"
      ref={elementRef}
      disabled={disabled}
      data-testid="button-component"
      {...eventHandlers}
      {...rest}
    >
      {children}
    </button>
  );
}

export default memo(Button);
