import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  autoFocus?: boolean;
  forwardedRef?: React.RefObject<HTMLButtonElement> | null;
}
