import expect from 'expect';
import NewNoteForm from '../NewNoteForm';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';

describe('NewNoteForm', () => {
  let c;
  let form;
  let spy;
  let textarea;

  beforeEach(() => {
    spy = sinon.spy();
    c = TestUtils.renderIntoDocument(<NewNoteForm onSubmit={spy} />);
    form = ReactDOM.findDOMNode(c);
    textarea = ReactDOM.findDOMNode(c.refs.newNote);
  });

  it('does not call onSubmit when input is empty', () => {
    TestUtils.Simulate.submit(form);
    expect(spy.callCount).toBe(0);
    textarea.value = '   ';
    TestUtils.Simulate.submit(form);
    expect(spy.callCount).toBe(0);
  });

  it('emptys the input when onSubmit is called', () => {
    textarea.value = '  よし  ';
    TestUtils.Simulate.submit(form);
    expect(spy.callCount).toBe(1);
    expect(spy.calledWith('よし')).toBe(true);
    expect(textarea.value).toBe('');
  });
});
