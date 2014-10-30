var Firebase = require('firebase');

module.exports = {
  authRequired: true,
  firebaseRef: new Firebase("https://qdsndc.firebaseio.com"),
  user: JSON.parse(localStorage.getItem('user')),
};
