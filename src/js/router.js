import React from 'react';
import Root from './components/Root';
import { Route, Router } from 'react-router';

export default (
  <Router>
    <Route path="/" component={Root} />
  </Router>
);
