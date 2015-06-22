var FastClick = require('fastclick');
var React = require('react');
var Router = require('react-router');
var { DefaultRoute, Route } = require('react-router');

var App = require('./components/App.jsx');
var Index = require('./components/Index.jsx');
var Login = require('./components/Login.jsx');
var Logout = require('./components/Logout.jsx');

Router.run((
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
  </Route>
), (Handler) => {
  React.render(<Handler />, document.body);
});

FastClick(document.body);
