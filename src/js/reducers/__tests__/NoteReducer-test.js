import * as NoteActions from '../../actions/NoteActions';
import expect from 'expect';
import NoteReducer from '../NoteReducer';

describe('NoteReducer', () => {
  let state;

  beforeEach(() => {
    state = NoteReducer(undefined, {
      type: NoteActions.ADD_SUCCESS,
      payload: { id: 'abc', content: 'こんにちわ' },
    });
  });

  it('handles ADD_SUCCESS', () => {
    expect(state.getIn(['items', 'abc', 'content'])).toBe('こんにちわ');
  });

  it('handles DESTROY_SUCCESS', () => {
    const count = state.get('items').size;
    state = NoteReducer(state, {
      type: NoteActions.DESTROY_SUCCESS,
      payload: { id: 'abc' },
    });
    expect(state.get('items').size).toBe(count - 1);
    expect(state.getIn(['items', 'abc'])).toBe(undefined);
  });

  it('handles FETCH_SUCCESS', () => {
    state = NoteReducer(state, {
      type: NoteActions.FETCH_SUCCESS,
      payload: { a: { content: '花' }, b: { content: '見' } },
    });
    expect(state.get('loaded')).toBe(true);
    expect(state.get('items').size).toBe(2);
    expect(state.getIn(['items', 'a', 'id'])).toBe('a');
    expect(state.getIn(['items', 'a', 'content'])).toBe('花');
    expect(state.getIn(['items', 'b', 'id'])).toBe('b');
    expect(state.getIn(['items', 'b', 'content'])).toBe('見');
  });

  it('handles HYDRATE', () => {
    state = NoteReducer(state, {
      type: NoteActions.HYDRATE,
      payload: null,
    });
    expect(state.get('loaded')).toBe(false);
    expect(state.get('items').size).toBe(0);

    state = NoteReducer(state, {
      type: NoteActions.HYDRATE,
      payload: { s: { content: '水' } },
    });
    expect(state.get('loaded')).toBe(false);
    expect(state.get('items').size).toBe(1);
    expect(state.getIn(['items', 's', 'id'])).toBe('s');
    expect(state.getIn(['items', 's', 'content'])).toBe('水');
  });

  it('handles UPDATE_SUCCESS', () => {
    state = NoteReducer(state, {
      type: NoteActions.UPDATE_SUCCESS,
      payload: { id: 'abc', content: 'こんばんわ', hidden: true },
    });
    expect(state.getIn(['items', 'abc', 'content'])).toBe('こんばんわ');
    expect(state.getIn(['items', 'abc', 'hidden'])).toBe(true);
  });

  describe('localHidden', () => {
    it('handles TOGGLE_LOCAL_HIDDEN', () => {
      let note;

      note = { id: '1', hidden: true };
      // Sets it to the opposite of the hidden value
      state = NoteReducer(state, {
        type: NoteActions.TOGGLE_LOCAL_HIDDEN,
        payload: note,
      });
      expect(state.getIn(['localHidden', '1'])).toBe(false);
      // Sets it to the opposite of current value
      state = NoteReducer(state, {
        type: NoteActions.TOGGLE_LOCAL_HIDDEN,
        payload: note,
      });
      expect(state.getIn(['localHidden', '1'])).toBe(true);

      note = { id: '2', hidden: false };
      state = NoteReducer(state, {
        type: NoteActions.TOGGLE_LOCAL_HIDDEN,
        payload: note,
      });
      expect(state.getIn(['localHidden', '2'])).toBe(true);
    });

    it('deletes note id when hidden property is updated', () => {
      const note = state.getIn(['items', 'abc']);

      state = NoteReducer(state, {
        type: NoteActions.TOGGLE_LOCAL_HIDDEN,
        payload: note,
      });
      expect(state.getIn(['localHidden', 'abc'])).toBe(true);

      state = NoteReducer(state, {
        type: NoteActions.UPDATE_SUCCESS,
        payload: { id: 'abc', content: '', hidden: false },
      });
      expect(state.getIn(['localHidden', 'abc'])).toBe(true);

      state = NoteReducer(state, {
        type: NoteActions.UPDATE_SUCCESS,
        payload: { id: 'abc', content: '', hidden: true },
      });
      expect(state.getIn(['localHidden', 'abc'])).toBe(undefined);
    });
  });
});
