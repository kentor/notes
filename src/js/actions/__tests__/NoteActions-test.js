import * as NoteActions from '../NoteActions';
import Storage from 'dom-storage';

describe('NoteActions', () => {
  describe('#hydrate', () => {
    beforeEach(() => {
      global.localStorage = new Storage(null, { strict: true });
    });

    it('send a null payload when localStorage has no notes', () => {
      expect(NoteActions.hydrate()).toEqual({
        type: NoteActions.HYDRATE,
        payload: null,
      });
    });

    it('sends the correct payload from localStorage', () => {
      localStorage.setItem('notes', JSON.stringify({ s: { content: '水' } }));
      expect(NoteActions.hydrate()).toEqual({
        type: NoteActions.HYDRATE,
        payload: { 's': { content: '水' } },
      });
    });
  });
});
