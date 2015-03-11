jest.autoMockOff();

var Immutable = require('immutable');
var Note = require('../note');

describe('note', () => {
  it('serializes without localHidden when fed to JSON.stringify', () => {
    var note = new Note({ localHidden: 'sup' });
    var notes = JSON.parse(JSON.stringify(Immutable.Map({ note })));
    expect(notes.note.hasOwnProperty('localHidden')).toBe(false);
  });
});
