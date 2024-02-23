import { useRef } from 'react';
import { expect, userEvent, within } from '@storybook/test';

import { lokiPlayDecorator } from '@/testUtils/loki/play-decorator';

import { useFocusable } from './useFocusable';

import styles from './useFocusable.stories.module.css';

export default {
  title: 'Hooks/UseFocusable',
  component: useFocusable,
  argTypes: {
    autoFocus: {
      control: {
        type: 'boolean',
      },
    },
  },
};

function FocusableComponent({
  autoFocus = false,
  buttonTestId = 'focus-button',
  focusableTestId = 'focusable',
}) {
  const ref = useRef<HTMLElement | null>(null);

  const { ref: elementRef, setFocus } = useFocusable(ref, { autoFocus });

  return (
    <div>
      <div
        className={styles.focusable}
        role="button"
        tabIndex={0}
        ref={elementRef}
        data-testid={focusableTestId}
      >
        Click the button to focus it. This element is
      </div>
      <button
        type="button"
        onClick={setFocus}
        data-testid={buttonTestId}
      >
        Click me to focus
      </button>
    </div>
  );
}

export function Playground({...args}) {
  return <FocusableComponent {...args} />;
}

Playground.args = {
  autoFocus: false,
};

export function AutoFocus() {
  return <FocusableComponent autoFocus />;
}

export function ClickToFocus() {
  return <FocusableComponent />;
}

ClickToFocus.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('focus-button'));

    expect(canvas.getByTestId('focusable')).toHaveFocus();
  }
);

export function FocusOnTab() {
  return (
    <FocusableComponent />
  );
}

FocusOnTab.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();

    expect(canvas.getByTestId('focusable')).toHaveFocus();
  }
);

export function FocusAssociated() {
  return (
    <div>
      <FocusableComponent buttonTestId="focus-button-1" focusableTestId="focusable-1" />
      <FocusableComponent buttonTestId="focus-button-2" focusableTestId="focusable-2" />
    </div>
  );
}

FocusAssociated.storyName = 'Focus the correct element associated with its ref on click';

FocusAssociated.play = lokiPlayDecorator(
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('focus-button-2'));

    expect(canvas.getByTestId('focusable-2')).toHaveFocus();
  }
);
