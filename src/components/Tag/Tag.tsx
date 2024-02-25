import { memo } from 'react';

import type { TagProps } from './Tag.d';

function Tag({
  children,
  ...rest
}: TagProps) {
  return (
    <div
      data-testid="tag-component"
      tabIndex={-1}
      {...rest}
    >
      {children}
    </div>
  );
}

export default memo(Tag);
