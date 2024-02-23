import { useState } from 'react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { lokiPlayDecorator } from '@/testUtils/loki/play-decorator';

import { useDebounceCallback } from './useDebounceCallback';

export default {
  title: 'Hooks/useDebounceCallback',
  component: useDebounceCallback,
};

function ClickableComponent({
  useDebounceCallbackProps = {},
}) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevState => prevState + 1);
  };

  const debounced = useDebounceCallback({ callback: handleClick, ...useDebounceCallbackProps });

  return (
    <div>
      <button
        type="button"
        data-testid="clickable"
        onClick={debounced}
      >
        Click me
      </button>
      <p
        data-testid="count"
      >
        Callback called
        {' '}
        {count}
        {' '}
        times
      </p>
    </div>
  );
}

export function Playground({...args}) {
  return <ClickableComponent {...args} />;
}

export function ClickMulipleTimes() {
  return <ClickableComponent />;
}

ClickMulipleTimes.storyName = 'Calls the callback only once after multiple calls';
ClickMulipleTimes.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.dblClick(canvas.getByTestId('clickable'));
    await userEvent.dblClick(canvas.getByTestId('clickable'));
    await userEvent.dblClick(canvas.getByTestId('clickable'));


    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'));
  }
);

export function CallAfterWaitTime() {
  return <ClickableComponent />;
}

CallAfterWaitTime.storyName = 'Calls the callback after the wait time';
CallAfterWaitTime.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'));
  }
);

export function DoNotCallBeforeWaitTime() {
  return <ClickableComponent />;
}

DoNotCallBeforeWaitTime.storyName = 'Does not call the callback before the wait time';
DoNotCallBeforeWaitTime.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 0 times'), { timeout: 100 });
    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'));
  }
);

export function LeadingTrue() {
  return (
    <ClickableComponent useDebounceCallbackProps={{ options: { leading: true } }} />
  );
}

LeadingTrue.storyName = 'Calls the callback immediately if leading is true';
LeadingTrue.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'), { timeout: 0 });
  }
);

export function TrailingTrue() {
  return (
    <ClickableComponent useDebounceCallbackProps={{ options: { trailing: true } }} />
  );
}

TrailingTrue.storyName = 'Calls the callback after the wait time if trailing is true';
TrailingTrue.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 0 times'), { timeout: 200 });
    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'));
  }
);

export function LeadingAndTrailingTrue() {
  return (
    <ClickableComponent useDebounceCallbackProps={{ options: { leading: true, trailing: true } }} />
  );
}

LeadingAndTrailingTrue.storyName = 'Calls the callback immediately and after the wait time if both leading and trailing are true';
LeadingAndTrailingTrue.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'), { timeout: 200 });
    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 2 times'));
  }
);

export function LeadingAndTrailingFalse() {
  return (
    <ClickableComponent useDebounceCallbackProps={{ options: { leading: false, trailing: false } }} />
  );
}

LeadingAndTrailingFalse.storyName = 'Does not call the callback if both leading and trailing are false';
LeadingAndTrailingFalse.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 0 times'), { timeout: 200 });
    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 0 times'));
  }
);

export function DisableDebounce() {
  return (
    <ClickableComponent useDebounceCallbackProps={{ disableDebounce: true }} />
  );
}

DisableDebounce.storyName = 'Calls the callback immediately if disableDebounce is true';
DisableDebounce.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Callback called 1 times'), { timeout: 0 });
  }
);
