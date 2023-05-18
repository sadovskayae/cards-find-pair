import React from 'react';
import { act, renderHook,} from '@testing-library/react';
import { useTimer } from './useTimer';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('no record if not started', () => {
  const {result} = renderHook(() => useTimer(false));
  expect(result.current).toBe(0);
});

test('check timer after 5 seconds', () => {
  const {result} = renderHook(() => useTimer(true));
  expect(result.current).toBe(0);
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(result.current).toBe(5);
});

test('check that timer still stopped after 5 seconds', () => {
  const {result, rerender} = renderHook((startTimer) => useTimer(startTimer), {initialProps: true});
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(result.current).toBe(5);
  rerender(false);
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(result.current).toBe(5);
});

