var Firebase = require('firebase');

module.exports = {
  authRequired: true,
  firebaseRef: new Firebase("https://qdsndc.firebaseio.com"),
  provider: 'twitter',
};
