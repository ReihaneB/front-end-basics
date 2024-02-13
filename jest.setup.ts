// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const { error } = console;

console.error = function logError(...args) {
  error.apply(console, args); // keep default behaviour
  throw (args[0] instanceof Error ? args[0] : new Error(args[0]));
};

const { warn } = console;

console.warn = function logWarning(...args) {
  warn.apply(console, args); // keep default behaviour
  throw (args[0] instanceof Error ? args[0] : new Error(args[0]));
};
