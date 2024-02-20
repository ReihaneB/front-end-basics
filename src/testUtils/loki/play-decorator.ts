/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import createAsyncCallback from '@loki/create-async-callback';
// @ts-expect-error
import isLokiRunning from '@loki/is-loki-running';
import type {PlayFunction} from '@storybook/csf';
// @ts-expect-error
import type {ReactFramework} from '@storybook/react';

async function waitForDocumentLoaded(): Promise<void> {
  if (document.readyState === 'loading') {
    return new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', () => resolve());
    });
  }

  return Promise.resolve();
}

function enablePointerEvents(): void {
  const styleElement = document.createElement('style');
  document.documentElement.appendChild(styleElement);
  styleElement.sheet?.insertRule('* {pointer-events: auto !important}');
}

export function lokiPlayDecorator(
  target: PlayFunction<ReactFramework>
): PlayFunction<ReactFramework> {
  return async context => {
    const lokiRunning = isLokiRunning();
    const asyncCallback = createAsyncCallback();

    if (lokiRunning) {
      await waitForDocumentLoaded();
      enablePointerEvents();
    }

    try {
      await target(context);
    } finally {
      asyncCallback();
    }
  };
}
