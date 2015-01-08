jest.autoMockOff();

import NoteStore from '../src/js/stores/NoteStore';

describe('NoteStore', () => {
  var dateTime = (new Date()).toISOString();

  beforeEach(() => {
    var noteObj = {
      content: 'hey',
      createdAt: dateTime,
      hidden: false,
    };

    NoteStore.onNoteAdded('1', noteObj);
  });

  afterEach(() => {
    NoteStore.clearAll();
  });

  it('can add notes', () => {
    var notes = NoteStore.getAll();
    var note = notes.get('1');

    expect(notes.size).toBe(1);
    expect(note.get('name')).toEqual('1');
    expect(note.get('content')).toEqual('hey');
    expect(note.get('createdAt').toISOString()).toEqual(dateTime);
    expect(note.get('hidden')).toBe(false);
    expect(note.get('localHidden')).toBe(false);
  });

  it('can update notes', () => {
    NoteStore.onNoteChanged('1', { hidden: true });

    var note = NoteStore.getAll().get('1');

    expect(note.get('name')).toEqual('1');
    expect(note.get('content')).toEqual('hey');
    expect(note.get('createdAt').toISOString()).toEqual(dateTime);
    expect(note.get('hidden')).toBe(true);
    expect(note.get('localHidden')).toBe(true);
  });

  it('can remove notes', () => {
    var beforeSize = NoteStore.getAll().size;
    NoteStore.onNoteRemoved('1');
    var notes = NoteStore.getAll();

    expect(notes.size - beforeSize).toBe(-1);
    expect(notes.get('1')).toBe(undefined);
  });

  it('can toggle localHidden', () => {
    var oldLocalHidden = NoteStore.getAll().get('1').get('localHidden');
    NoteStore.onToggleLocalHidden('1');
    var newLocalHidden = NoteStore.getAll().get('1').get('localHidden');
    expect(newLocalHidden).toBe(!oldLocalHidden);
  });
});
