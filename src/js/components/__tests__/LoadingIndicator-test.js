import LoadingIndicator from '../LoadingIndicator';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('LoadingIndicator', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('shows correct number of dots', () => {
    const wrapper = mount(<LoadingIndicator interval={42} />);

    expect(wrapper.text()).toBe('.');
    clock.tick(42);
    expect(wrapper.text()).toBe('..');
    clock.tick(42);
    expect(wrapper.text()).toBe('...');
    clock.tick(42);
    expect(wrapper.text()).toBe('..');
    clock.tick(42);
    expect(wrapper.text()).toBe('.');
    clock.tick(42);
    expect(wrapper.text()).toBe('..');
    clock.tick(42);
    expect(wrapper.text()).toBe('...');
    clock.tick(42);
    expect(wrapper.text()).toBe('..');
    clock.tick(42);
    expect(wrapper.text()).toBe('.');
  });
});
