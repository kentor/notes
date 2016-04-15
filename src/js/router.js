import React from 'react';
import Root from './components/Root';
import { browserHistory, Route, Router } from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Root} />
  </Router>
);
