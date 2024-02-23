import { useState } from 'react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { lokiPlayDecorator } from '@/testUtils/loki/play-decorator';

import { useClickable } from './useClickable';

export default {
  title: 'Hooks/useClickable',
  component: useClickable,
};

function ClickableComponent({
  useClickableProps = {},
}) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevState => prevState + 1);
  };

  const { eventHandlers } = useClickable({ onClick: handleClick, ...useClickableProps });

  return (
    <div>
      <button
        type="button"
        data-testid="clickable"
        {...eventHandlers}
      >
        Click me
      </button>
      <p
        data-testid="count"
      >
        Clicked
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

export function ClickOnce() {
  return <ClickableComponent />;
}

ClickOnce.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 1 times'));
  }
);

export function DisableDebounce() {
  return (
    <ClickableComponent useClickableProps={{ disableDebounce: true }} />
  );
}

DisableDebounce.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 2 times');
  }
);

export function Disabled() {
  return (
    <ClickableComponent useClickableProps={{ disabled: true }} />
  );
}

Disabled.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));

    expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 0 times');
  }
);

export function MultipleClicks() {
  return <ClickableComponent />;
}

MultipleClicks.storyName = 'Clicking multiple times will only trigger onClick once';
MultipleClicks.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));
    await userEvent.click(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 1 times'));
  }
);

export function WithOnMouseDown() {
  const [callMouseDown, setCallMouseDown] = useState(0);

  const handleMouseDown = () => {
    setCallMouseDown(prevState => prevState + 1);
  };
  return (
    <div>
      <p>
        onMouseDown called
        {' '}
        {callMouseDown}
        {' '}
        times
      </p>
      <ClickableComponent useClickableProps={{ onMouseDown: handleMouseDown }} />
    </div>
  );
}

WithOnMouseDown.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('clickable'), '{mousedown}');

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 1 times'));
  }
);

export function PressEnter() {
  const [callMouseDown, setCallMouseDown] = useState(0);

  const handleMouseDown = () => {
    setCallMouseDown(prevState => prevState + 1);
  };
  return (
    <div>
      <p>
        onMouseDown called
        {' '}
        {callMouseDown}
        {' '}
        times
      </p>
      <ClickableComponent useClickableProps={{ onMouseDown: handleMouseDown }} />
    </div>
  );
}

PressEnter.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('clickable'), '{enter}');

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 1 times'));
  }
);

export function PressSpace() {
  const [callMouseDown, setCallMouseDown] = useState(0);

  const handleMouseDown = () => {
    setCallMouseDown(prevState => prevState + 1);
  };
  return (
    <div>
      <p>
        onMouseDown called
        {' '}
        {callMouseDown}
        {' '}
        times
      </p>
      <ClickableComponent useClickableProps={{ onMouseDown: handleMouseDown }} />
    </div>
  );
}

PressSpace.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('clickable'), '{space}');

    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 1 times'));
  }
);

export function WithOnMouseEnter() {
  const [callMouseEnter, setCallMouseEnter] = useState(0);

  const handleMouseEnter = () => {
    setCallMouseEnter(prevState => prevState + 1);
  };
  return (
    <div>
      <p data-testid="mouse-enter">
        onMouseEnter called
        {' '}
        {callMouseEnter}
        {' '}
        times
      </p>
      <ClickableComponent useClickableProps={{ onMouseEnter: handleMouseEnter }} />
    </div>
  );
}

WithOnMouseEnter.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.hover(canvas.getByTestId('clickable'));
    await userEvent.hover(canvas.getByTestId('clickable'));
    await userEvent.hover(canvas.getByTestId('clickable'));

    await waitFor(() => expect(canvas.getByTestId('mouse-enter')).toHaveTextContent('onMouseEnter called 3 times'));
    await waitFor(() => expect(canvas.getByTestId('count')).toHaveTextContent('Clicked 0 times'));
  }
);
