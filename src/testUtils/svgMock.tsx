import { forwardRef } from 'react';

const SvgrMock = forwardRef<HTMLInputElement>(({ ...rest }, ref) => (
  <div ref={ref} {...rest} />
));

export const ReactComponent = SvgrMock;
export default SvgrMock;
