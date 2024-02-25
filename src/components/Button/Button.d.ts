import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  disableDebounce?: boolean;
  autoFocus?: boolean;
  forwardedRef?: React.RefObject<HTMLButtonElement> | null;
}
