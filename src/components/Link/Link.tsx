import { memo } from 'react';
import NextLink from 'next/link';

import { useFocusable } from '@/hooks/useFocusable/useFocusable';

import type { LinkProps } from './Link.d';

function Link({
  to,
  children,
  autoFocus = false,
  forwardedRef = null,
  ...rest
}: LinkProps) {
  const { ref: elementRef } = useFocusable(forwardedRef, { autoFocus });

  return (
    <NextLink
      href={to}
      ref={elementRef}
      data-testid="link-component"
      {...rest}
    >
      {children}
    </NextLink>
  );
}

export default memo(Link);
