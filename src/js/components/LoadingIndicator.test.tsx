import LoadingIndicator from 'App/components/LoadingIndicator';
import React from 'react';
import {render, cleanup, act} from 'react-testing-library';

jest.useFakeTimers();

afterEach(cleanup);

function advanceTime(ms: number) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

test('correctly renders the loading indicator', () => {
  const {container} = render(<LoadingIndicator />);
  expect(container.textContent).toBe('.');
  advanceTime(99);
  expect(container.textContent).toBe('.');
  advanceTime(1);
  expect(container.textContent).toBe('..');
  advanceTime(100);
  expect(container.textContent).toBe('...');
  advanceTime(100);
  expect(container.textContent).toBe('..');
  advanceTime(100);
  expect(container.textContent).toBe('.');
  advanceTime(100);
  expect(container.textContent).toBe('..');
});
