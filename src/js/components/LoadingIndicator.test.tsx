import LoadingIndicator from 'App/components/LoadingIndicator.tsx';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

vi.useFakeTimers();

afterEach(cleanup);

test('correctly renders the loading indicator', async () => {
  const { container } = render(<LoadingIndicator />);
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
