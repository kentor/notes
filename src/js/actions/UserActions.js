import API from '../api';
import Reflux from 'reflux';

var UserActions = Reflux.createActions([
  'loggedIn',
  'loggedOut',
  'login',
]);

UserActions.login.listen(() => {
  API.login();
});

export default UserActions;
