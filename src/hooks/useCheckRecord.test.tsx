import React from 'react';
import { renderHook,} from '@testing-library/react';
import { useCheckRecord } from './useCheckRecord';

beforeEach(() => {
  window.localStorage.clear();
});

test('no record if no win', () => {
  const {result} = renderHook(() => useCheckRecord(false, 1, 1));
  expect(result.current?.move).toBe(0);
  expect(result.current?.time).toBe(0);
});

test('check record does not change if result is worse', () => {
  const recordValue = 3;
  const {result, rerender} = renderHook(({win, timer, moves}) => useCheckRecord(win, timer, moves), 
    {initialProps: {win: true, timer: recordValue, moves: recordValue}
  });
  expect(result.current?.move).toBe(recordValue);
  expect(result.current?.time).toBe(recordValue);
  rerender({win: false, timer: 0, moves: 0});
  rerender({win: true, timer: 6, moves: 6});
  expect(result.current?.move).toBe(recordValue);
  expect(result.current?.time).toBe(recordValue);
});

test('check setting new record', () => {
  const {result, rerender} = renderHook(({win, timer, moves}) => useCheckRecord(win, timer, moves), 
    {initialProps: {win: true, timer: 5, moves: 5}
  });
  expect(result.current?.move).toBe(5);
  expect(result.current?.time).toBe(5);
  rerender({win: false, timer: 0, moves: 0});
  rerender({win: true, timer: 4, moves: 4});
  expect(result.current?.move).toBe(4);
  expect(result.current?.time).toBe(4);
});