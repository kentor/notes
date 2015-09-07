import * as NoteActions from './actions/NoteActions';
import * as SessionActions from './actions/SessionActions';
import store from './store';
import { firebaseRef, provider } from './appconfig';

export function API(ref, provider) {
  this.ref = ref;
  this.noteRef = ref.child('notes');
  this.provider = provider;
}

Object.assign(API.prototype, {
  subscribe() {
    let initialDataLoaded = false;

    this.noteRef.once('value', snapshot => {
      store.dispatch({
        type: NoteActions.FETCH_SUCCESS,
        payload: snapshot.val(),
      });
      initialDataLoaded = true;
    });

    this.noteRef.on('child_added', snapshot => {
      if (initialDataLoaded) {
        const payload = snapshot.val();
        payload.id = snapshot.key();
        store.dispatch({
          type: NoteActions.ADD_SUCCESS,
          payload,
        });
      }
    });

    this.noteRef.on('child_removed', snapshot => {
      store.dispatch({
        type: NoteActions.DESTROY_SUCCESS,
        payload: { id: snapshot.key() },
      });
    });

    this.noteRef.on('child_changed', snapshot => {
      const payload = snapshot.val();
      payload.id = snapshot.key();
      store.dispatch({
        type: NoteActions.UPDATE_SUCCESS,
        payload,
      });
    });
  },

  unsubscribe() {
    this.noteRef.off('child_added');
    this.noteRef.off('child_changed');
    this.noteRef.off('child_removed');
  },

  createNote(content) {
    this.noteRef.push({
      content,
      createdAt: (new Date()).toISOString(),
      hidden: false,
    });
  },

  destroyNote(id) {
    this.noteRef.child(id).remove();
  },

  updateNote(id, data) {
    this.noteRef.child(id).update(data);
  },

  authenticate() {
    this.ref.onAuth(data => {
      store.dispatch({
        type: data ? SessionActions.LOGIN_SUCCESS : SessionActions.LOGOUT,
        payload: data,
      });
    });
  },

  login() {
    this.ref.authWithOAuthRedirect(this.provider, () => {});
  },

  logout() {
    this.ref.unauth();
  },
});

export default new API(firebaseRef, provider);
