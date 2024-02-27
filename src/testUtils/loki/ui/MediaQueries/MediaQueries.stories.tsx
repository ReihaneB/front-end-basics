import type { Meta, StoryObj } from '@storybook/react';

import MediaQueries from './MediaQueries';

const meta: Meta<typeof MediaQueries> = {
  title: 'UI/MediaQueries',
  component: MediaQueries,
};

export default meta;
type Story = StoryObj<typeof MediaQueries>;

const defaultArgs = {
  children: 'Tag content',
};

export const Playground: Story = {
  args: {
    ...defaultArgs,
  },
};
