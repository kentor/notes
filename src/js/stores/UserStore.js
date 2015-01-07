import Reflux from 'reflux';
import UserActions from '../actions/UserActions';

var user = JSON.parse(localStorage.user || null);

var UserStore = Reflux.createStore({
  listenables: UserActions,

  user() {
    return user;
  },

  onLoggedIn(jsonUser) {
    user = jsonUser;
    localStorage.user = JSON.stringify(jsonUser);
  },

  onLoggedOut() {
    user = null;
    delete localStorage.user;
  },
});

export default UserStore;
