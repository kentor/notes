import LoadingIndicator from 'App/components/LoadingIndicator';
import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {vi, test, expect, afterEach} from 'vitest';

vi.useFakeTimers();

afterEach(cleanup);

test('correctly renders the loading indicator', async () => {
  const {container} = render(<LoadingIndicator />);
  expect(container.textContent).toBe('.');
  await vi.advanceTimersByTimeAsync(99);
  expect(container.textContent).toBe('.');
  await vi.advanceTimersByTimeAsync(1);
  expect(container.textContent).toBe('..');
  await vi.advanceTimersByTimeAsync(100);
  expect(container.textContent).toBe('...');
  await vi.advanceTimersByTimeAsync(100);
  expect(container.textContent).toBe('..');
  await vi.advanceTimersByTimeAsync(100);
  expect(container.textContent).toBe('.');
  await vi.advanceTimersByTimeAsync(100);
  expect(container.textContent).toBe('..');
});
