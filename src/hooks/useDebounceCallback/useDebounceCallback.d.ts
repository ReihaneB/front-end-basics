export type useDebounceCallbackProps = {
  callback: (...rest: unknown[]) => unknown;
  waitTime?: number;
  options?: {
    leading?: boolean;
    trailing?: boolean;
  };
  disableDebounce?: boolean;
};
