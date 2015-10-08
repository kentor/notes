import expect from 'expect';
import Note from '../Note';
import NoteModel from '../../models/Note';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';

const render = TestUtils.renderIntoDocument;

describe('Note Component', () => {
  describe('#shouldShowContent', () => {
    let note = new NoteModel();

    it('returns false if localHidden is true', () => {
      const c = render(<Note note={note} localHidden={true} />);
      expect(c.shouldShowContent()).toBe(false);
    });

    it('returns true if localHidden is false and note hidden is true', () => {
      let c;
      note = note.set('hidden', true);
      c = render(<Note note={note} />);
      expect(c.shouldShowContent()).toBe(false);
      c = render(<Note note={note} localHidden={false} />);
      expect(c.shouldShowContent()).toBe(true);
    });
  });

  describe('with markdown', () => {
    it('render links', () => {
      const note = new NoteModel({ content: 'http://kentor.me/' });
      const node = ReactDOM.findDOMNode(render(<Note note={note} />));
      expect(node.innerHTML).toContain('<a href="http://kentor.me/">');
    });

    it('escapes html', () => {
      const note = new NoteModel({ content: '<script></script>' });
      const node = ReactDOM.findDOMNode(render(<Note note={note} />));
      expect(node.innerHTML).toContain('&lt;script&gt;&lt;/script&gt;');
    });

    it('inserts line breaks', () => {
      const note = new NoteModel({ content: '犬\n猫' });
      const node = ReactDOM.findDOMNode(render(<Note note={note} />));
      expect(node.innerHTML).toContain('犬<br>猫');
    });
  });

  it('renders relative time ago', () => {
    let node;
    let note;

    note = new NoteModel({ createdAt: new Date() - 1000 });
    node = ReactDOM.findDOMNode(render(<Note note={note} />));
    expect(node.textContent).toMatch(/1 second/);

    note = new NoteModel({ createdAt: new Date() - 2000 * 60 });
    node = ReactDOM.findDOMNode(render(<Note note={note} />));
    expect(node.textContent).toMatch(/2 minutes/);
  });

  it('does not call onToggleLocalHidden when window has a selection', () => {
    const note = new NoteModel();
    const spy = sinon.spy();
    const c = render(<Note note={note} onToggleLocalHidden={spy} />);

    window.getSelection = () => '';
    c.toggleLocalHidden();
    expect(spy.callCount).toBe(1);

    window.getSelection = () => 'something';
    c.toggleLocalHidden();
    expect(spy.callCount).toBe(1);
  });

  it('handles toggleHidden and destroy correctly', () => {
    const note = new NoteModel();
    const destroySpy = sinon.spy();
    const toggleHiddenSpy = sinon.spy();
    const toggleLocalHiddenSpy = sinon.spy();
    const c = render(
      <Note
        note={note}
        onDestroy={destroySpy}
        onToggleHidden={toggleHiddenSpy}
        onToggleLocalHidden={toggleLocalHiddenSpy}
      />
    );

    TestUtils.Simulate.click(ReactDOM.findDOMNode(c.refs.destroy));
    TestUtils.Simulate.click(ReactDOM.findDOMNode(c.refs.toggleHidden));
    expect(destroySpy.callCount).toBe(1);
    expect(toggleHiddenSpy.callCount).toBe(1);
    expect(toggleLocalHiddenSpy.callCount).toBe(0);
  });
});
