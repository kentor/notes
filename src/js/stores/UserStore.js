import localStorage from '../localStorage';
import Reflux from 'reflux';
import UserActions from '../actions/UserActions';

var user = JSON.parse(localStorage.getItem('user'));

var UserStore = Reflux.createStore({
  listenables: UserActions,

  user() {
    return user;
  },

  onLoggedIn(jsonUser) {
    user = jsonUser;
    localStorage.setItem('user', JSON.stringify(jsonUser));
  },

  onLoggedOut() {
    user = null;
    localStorage.removeItem('user');
  },
});

export default UserStore;
