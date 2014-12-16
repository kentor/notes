var React = require('react');
var Router = require('react-router');
var Appconfig = require('../appconfig');

var Logout = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount: function() {
    Appconfig.firebaseRef.unauth();
    this.transitionTo('login');
  },

  render: function() {
    return <div></div>;
  }
});

module.exports = Logout;
