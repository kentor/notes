var Api = require('../api');
var Appconfig = require('../appconfig');
var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var UserStore = require('../stores/UserStore');
var { RouteHandler } = require('react-router');

var App = React.createClass({
  mixins: [
    Reflux.ListenerMixin,
    Router.Navigation,
  ],

  componentWillMount() {
    if (!Appconfig.authRequired) return;

    Api.authenticate();

    this.listenTo(UserStore, () => {
      if (UserStore.user()) {
        this.transitionTo('index');
      } else {
        this.transitionTo('login');
      }
    });
  },

  render() {
    return <RouteHandler />;
  },
});

module.exports = App;
