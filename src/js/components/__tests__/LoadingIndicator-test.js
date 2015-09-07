import expect from 'expect';
import LoadingIndicator from '../LoadingIndicator';
import React from 'react/addons';
import sinon from 'sinon';

const { TestUtils } = React.addons;

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
    const node = React.findDOMNode(c);

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
