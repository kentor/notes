jest.autoMockOff();

import Immutable from 'immutable';
import Note from '../note';

describe('note', () => {
  it('serializes without localHidden when fed to JSON.stringify', () => {
    var note = new Note({ localHidden: 'sup' });
    var notes = JSON.parse(JSON.stringify(Immutable.Map({ note })));
    expect(notes.note.hasOwnProperty('localHidden')).toBe(false);
  });
});
