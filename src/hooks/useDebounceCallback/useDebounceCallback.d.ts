export type useDebounceCallbackProps = {
  callback: (...args: never[]) => void;
  waitTime?: number;
  options?: {
    leading?: boolean;
    trailing?: boolean;
  };
  disableDebounce?: boolean;
};
