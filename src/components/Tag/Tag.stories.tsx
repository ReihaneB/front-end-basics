import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { lokiPlayDecorator } from '@/testUtils/loki/play-decorator';

import Tag from './Tag';

import styles from './Tag.stories.module.css';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

const defaultArgs = {
  children: 'Tag content',
};

export const Playground: Story = {
  args: {
    ...defaultArgs,
  },
};

export function LongText() {
  return (
    <div className={styles.container}>
      <Tag>
        This is a very long text that should be going to the next line
      </Tag>
    </div>
  );
}

LongText.storyName = 'Long text';

export const NotFocusTab: Story = {
  args: {
    ...defaultArgs,
  },
  play: lokiPlayDecorator(
    async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await userEvent.tab();

      await waitFor(() => expect(canvas.getByTestId('tag-component')).not.toHaveFocus());
    }
  ),
};
