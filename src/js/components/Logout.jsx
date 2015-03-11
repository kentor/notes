var React = require('react');
var Router = require('react-router');
var UserActions = require('../actions/UserActions');

var Logout = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    UserActions.logout();
    this.transitionTo('login');
  },

  render() {
    return null;
  },
});

module.exports = Logout;
