import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { lokiPlayDecorator } from '@/testUtils/loki/play-decorator';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const defaultArgs = {
  children: 'Click me',
  disabled: false,
  disableDebounce: false,
  autoFocus: false,
  forwardedRef: null,
};

export const Playground: Story = {
  args: {
    ...defaultArgs,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
  play: lokiPlayDecorator(
    async ({ args, canvasElement, step }) => {
      const canvas = within(canvasElement);

      await step('Click the button 2 times', async () => {
        await userEvent.click(canvas.getByTestId('button-component'));
        await userEvent.click(canvas.getByTestId('button-component'));
      });

      await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(0));
    }
  ),
};

export const AutoFocus: Story = {
  args: {
    ...defaultArgs,
    autoFocus: true,
  },
  play: lokiPlayDecorator(
    async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await waitFor(() => expect(canvas.getByTestId('button-component')).toHaveFocus());
    }
  ),
};

export const ClickMultipleTimes: Story = {
  name: 'Click multiple times but only call once',
  args: {
    ...defaultArgs,
  },
  play: lokiPlayDecorator(
    async ({ args, canvasElement, step }) => {
      const canvas = within(canvasElement);

      await step('Click the button 2 times', async () => {
        await userEvent.click(canvas.getByTestId('button-component'));
        await userEvent.click(canvas.getByTestId('button-component'));
      });

      await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(1));
    }
  ),
};

export const DisableDebounce: Story = {
  args: {
    ...defaultArgs,
    disableDebounce: true,
  },
  play: lokiPlayDecorator(
    async ({ args, canvasElement, step }) => {
      const canvas = within(canvasElement);

      await step('Click the button 2 times', async () => {
        await userEvent.click(canvas.getByTestId('button-component'));
        await userEvent.click(canvas.getByTestId('button-component'));
      });

      await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(2));
    }
  ),
};

export const PressEnter: Story = {
  args: {
    ...defaultArgs,
  },
  play: lokiPlayDecorator(
    async ({ args, canvasElement, step }) => {
      const canvas = within(canvasElement);

      await step('Press the button 2 times', async () => {
        await userEvent.type(canvas.getByTestId('button-component'), '{Enter}');
        await userEvent.type(canvas.getByTestId('button-component'), '{Enter}');
      });

      await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(1));
    }
  ),
};

export const PressSpace: Story = {
  args: {
    ...defaultArgs,
  },
  play: lokiPlayDecorator(
    async ({ args, canvasElement, step }) => {
      const canvas = within(canvasElement);

      await step('Press the button 2 times', async () => {
        await userEvent.type(canvas.getByTestId('button-component'), '{Space}');
        await userEvent.type(canvas.getByTestId('button-component'), '{Space}');
      });

      await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(1));
    }
  ),
};

export const FocusOnClick: Story = {
  name: 'Focused when clicked',
  args: {
    ...defaultArgs,
  },
  play: lokiPlayDecorator(
    async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await userEvent.click(canvas.getByTestId('button-component'));

      await waitFor(() => expect(canvas.getByTestId('button-component')).toHaveFocus());
    }
  ),
};

export const FocusOnTab: Story = {
  name: 'Focused when tabbed',
  args: {
    ...defaultArgs,
  },
  play: lokiPlayDecorator(
    async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await userEvent.tab();

      await waitFor(() => expect(canvas.getByTestId('button-component')).toHaveFocus());
    }
  ),
};
