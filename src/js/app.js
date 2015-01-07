import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Route } from 'react-router';

import App from './components/app';
import Index from './components/index';
import Login from './components/login';
import Logout from './components/logout';

Router.run((
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
  </Route>
), (Handler) => {
  React.render(<Handler />, document.body);
});

require('fastclick')(document.body);
