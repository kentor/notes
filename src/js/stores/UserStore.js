var ApiEvents = require('../events/ApiEvents');
var localStorage = require('./localStorage');
var Reflux = require('reflux');

var user = JSON.parse(localStorage.getItem('user'));

var UserStore = Reflux.createStore({
  listenables: [
    ApiEvents,
  ],

  user() {
    return user;
  },

  onLoggedIn(jsonUser) {
    user = jsonUser;
    localStorage.setItem('user', JSON.stringify(jsonUser));
    this.triggerAsync();
  },

  onLoggedOut() {
    user = null;
    localStorage.removeItem('user');
    this.triggerAsync();
  },
});

module.exports = UserStore;
