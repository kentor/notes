jest.autoMockOff();
jest.mock('../localStorage');

describe('NoteStore', () => {
  var NoteStore;
  var dateTime = (new Date()).toISOString();

  var expectDifference = (countFn, fn, delta = 1) => {
    var before = countFn();
    fn();
    var after = countFn();
    expect(after - before).toBe(delta);
  };

  beforeEach(() => {
    NoteStore = require('../NoteStore');
    spyOn(NoteStore, 'triggerAsync');

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
    expect(NoteStore.triggerAsync).toHaveBeenCalled();
  });

  it('can update notes', () => {
    var noteObj = {
      content: 'new stuff',
      createdAt: dateTime,
      hidden: true,
    };

    expectDifference(() => NoteStore.triggerAsync.callCount, () => {
      NoteStore.onNoteChanged('1', noteObj);
    });

    var note = NoteStore.getAll().get('1');

    expect(note.get('name')).toEqual('1');
    expect(note.get('content')).toEqual('new stuff');
    expect(note.get('createdAt').toISOString()).toEqual(dateTime);
    expect(note.get('hidden')).toBe(true);
    expect(note.get('localHidden')).toBe(true);
  });

  it('can remove notes', () => {
    var beforeSize = NoteStore.getAll().size;

    expectDifference(() => NoteStore.triggerAsync.callCount, () => {
      NoteStore.onNoteRemoved('1');
    });

    var notes = NoteStore.getAll();

    expect(notes.size - beforeSize).toBe(-1);
    expect(notes.get('1')).toBe(undefined);
  });

  it('can toggle localHidden', () => {
    var oldLocalHidden = NoteStore.getAll().get('1').get('localHidden');
    expectDifference(() => NoteStore.triggerAsync.callCount, () => {
      NoteStore.onToggleLocalHidden('1');
    });
    var newLocalHidden = NoteStore.getAll().get('1').get('localHidden');
    expect(newLocalHidden).toBe(!oldLocalHidden);
  });

  it('can persist to localStorage', () => {
    var localStorage = require('../localStorage');
    spyOn(JSON, 'stringify').andReturn(':)');
    NoteStore.persist();
    expect(JSON.stringify).toHaveBeenCalledWith(NoteStore.getAll());
    expect(localStorage.setItem).toBeCalledWith('notes', ':)');
  });
});
