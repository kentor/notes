import expect from 'expect';
import LoadingIndicator from '../LoadingIndicator';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';

describe('LoadingIndicator', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('shows correct number of dots', () => {
    const c = TestUtils.renderIntoDocument(<LoadingIndicator interval={42}/>);
    const node = ReactDOM.findDOMNode(c);

    expect(node.textContent).toBe('.');
    clock.tick(42);
    expect(node.textContent).toBe('..');
    clock.tick(42);
    expect(node.textContent).toBe('...');
    clock.tick(42);
    expect(node.textContent).toBe('..');
    clock.tick(42);
    expect(node.textContent).toBe('.');
    clock.tick(42);
    expect(node.textContent).toBe('..');
    clock.tick(42);
    expect(node.textContent).toBe('...');
    clock.tick(42);
    expect(node.textContent).toBe('..');
    clock.tick(42);
    expect(node.textContent).toBe('.');
  });
});
