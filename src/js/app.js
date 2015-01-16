import FastClick from 'fastclick';
import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Route } from 'react-router';

import App from './components/App.jsx';
import Index from './components/Index.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';

Router.run((
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
  </Route>
), Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.body);
});

FastClick(document.body);
