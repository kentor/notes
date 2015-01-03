jest.dontMock('immutable');
jest.dontMock('../src/js/models/note');
var Immutable = require('immutable');
var Note = require('../src/js/models/note');

describe('note', function() {
  it('returns object without localHidden when toJS called', function() {
    var note = new Note({ localHidden: 'sup' });
    expect(Immutable.Record.prototype.toJS.call(note).localHidden).toBe('sup');
    expect(note.toJS().localHidden).toBe(undefined);
  });
});
