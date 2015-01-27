import API from '../api';
import Reflux from 'reflux';

var UserActions = Reflux.createActions([
  'login',
  'logout',
]);

UserActions.login.listen(() => {
  API.login();
});

UserActions.logout.listen(() => {
  API.logout();
});

export default UserActions;
