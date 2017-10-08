import NewNoteForm from '../NewNoteForm';
import React from 'react';
import { mount } from 'enzyme';

describe('NewNoteForm', () => {
  let spy;
  let textarea;
  let wrapper;

  beforeEach(() => {
    spy = jest.fn();
    wrapper = mount(<NewNoteForm onSubmit={spy} />);
    textarea = wrapper.find('textarea').getDOMNode();
  });

  it('does not call onSubmit when input is empty', () => {
    wrapper.simulate('submit');
    expect(spy).toHaveBeenCalledTimes(0);
    textarea.value = '   ';
    wrapper.simulate('submit');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('emptys the input when onSubmit is called', () => {
    textarea.value = '  よし  ';
    wrapper.simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('よし');
    expect(textarea.value).toBe('');
  });
});
