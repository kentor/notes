var React = require('react');
var UserActions = require('../actions/UserActions');

var Login = React.createClass({
  handleClick() {
    UserActions.login();
  },

  render() {
    return <a className="login-button" onClick={this.handleClick}>Login</a>;
  },
});

module.exports = Login;
