import expect from 'expect';
import Immutable from 'immutable';
import Note from '../../models/Note';
import NotesPersister from '../NotesPersister';
import React from 'react/addons';
import Storage from 'dom-storage';

const { TestUtils } = React.addons;

describe('NotePersister Component', () => {
  beforeEach(() => {
    global.localStorage = new Storage(null, { strict: true });
  });

  it('persists the notes to localStorage', () => {
    expect(localStorage.getItem('notes')).toBe(null);
    const notes = Immutable.OrderedMap({
      a: new Note({
        content: '年',
        createdAt: (new Date()).toISOString(),
        hidden: true,
        id: 'a',
      }),
    });
    TestUtils.renderIntoDocument(<NotesPersister notes={notes} />);
    expect(localStorage.getItem('notes')).toBe(JSON.stringify(notes));
  });
});
