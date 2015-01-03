var React  = require('react');
var Router = require('react-router');
var Route  = Router.Route;

var App    = require('./components/app');
var Index  = require('./components/index');
var Login  = require('./components/login');
var Logout = require('./components/logout');

Router.run((
  <Route name="app" path="/" handler={App}>
    <Route name="index" handler={Index} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
  </Route>
), function(Handler) {
  React.render(<Handler />, document.body);
});

require('fastclick')(document.body);
