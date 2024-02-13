import { render } from '@testing-library/react';

import Page from './page';

describe('Page', () => {
  it('should render', () => {
    const { container } = render(
      <Page />
    );

    expect(container.children.length).toBe(1);
  });
});
