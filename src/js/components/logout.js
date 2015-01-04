var Appconfig = require('../appconfig');
var React = require('react');
var Router = require('react-router');

var Logout = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    Appconfig.firebaseRef.unauth();
    this.transitionTo('login');
  },

  render() {
    return <div></div>;
  },
});

module.exports = Logout;
