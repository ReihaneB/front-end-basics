import React from 'react';

interface useClickableProps {
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  disableDebounce?: boolean;
}
