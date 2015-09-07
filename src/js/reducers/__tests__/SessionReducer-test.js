import * as SessionActions from '../../actions/SessionActions';
import expect from 'expect';
import SessionReducer from '../SessionReducer';

describe('SessionReducer', () => {
  it('handles LOGIN_SUCCESS and LOGOUT', () => {
    let state;

    state = SessionReducer(undefined, {
      type: SessionActions.LOGIN_SUCCESS,
      payload: { uid: '0xDEADBEEF' },
    });
    expect(state).toEqual({ uid: '0xDEADBEEF' });

    state = SessionReducer(state, {
      type: SessionActions.LOGOUT,
    });
    expect(state).toBe(null);
  });
});
