import NewNoteForm from '../NewNoteForm';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('NewNoteForm', () => {
  let spy;
  let textarea;
  let wrapper;

  beforeEach(() => {
    spy = sinon.spy();
    wrapper = mount(<NewNoteForm onSubmit={spy} />);
    textarea = wrapper.ref('newNote').get(0);
  });

  it('does not call onSubmit when input is empty', () => {
    wrapper.simulate('submit');
    expect(spy.callCount).toBe(0);
    textarea.value = '   ';
    wrapper.simulate('submit');
    expect(spy.callCount).toBe(0);
  });

  it('emptys the input when onSubmit is called', () => {
    textarea.value = '  よし  ';
    wrapper.simulate('submit');
    expect(spy.callCount).toBe(1);
    expect(spy.calledWith('よし')).toBe(true);
    expect(textarea.value).toBe('');
  });
});
