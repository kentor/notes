var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Appconfig = require('../appconfig');

var App = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    if (!Appconfig.authRequired) return;

    Appconfig.firebaseRef.onAuth((jsonUser) => {
      if (jsonUser) {
        Appconfig.user = jsonUser;
        localStorage.setItem('user', JSON.stringify(jsonUser));
        this.transitionTo('index');
      } else {
        Appconfig.user = null;
        localStorage.removeItem('user');
        this.transitionTo('login');
      }
    });
  },

  render() {
    return <RouteHandler />;
  },
});

module.exports = App;
