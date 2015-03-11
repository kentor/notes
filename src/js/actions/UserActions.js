var API = require('../api');
var Reflux = require('reflux');

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

module.exports = UserActions;
