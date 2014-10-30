var React = require('react');
var Router = require('react-router');
var Appconfig = require('../appconfig');

var App = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount: function() {
    if (!Appconfig.authRequired) return;

    Appconfig.firebaseRef.onAuth(function(jsonUser) {
      if (jsonUser) {
        Appconfig.user = jsonUser;
        localStorage.setItem('user', JSON.stringify(jsonUser));
        this.transitionTo('index');
      } else {
        Appconfig.user = null;
        localStorage.removeItem('user');
        this.transitionTo('login');
      }
    }.bind(this));
  },

  render: function() {
    return <this.props.activeRouteHandler />;
  },
});

module.exports = App;
