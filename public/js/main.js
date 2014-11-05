var React  = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route  = Router.Route;

var Appconfig = require('./appconfig');

var App    = require('./components/app.jsx');
var Index  = require('./components/index.jsx');
var Login  = require('./components/login.jsx');
var Logout = require('./components/logout.jsx');

React.render((
  <Routes>
    <Route name="app" path="/" handler={App}>
      <Route name="index" path="/" handler={Index} />
      <Route name="login" handler={Login} />
      <Route name="logout" handler={Logout} />
    </Route>
  </Routes>
), document.body);
