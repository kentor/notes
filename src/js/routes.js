import React from 'react';
import Root from './components/Root';
import { Route } from 'react-router';

export default (
  <Route name="root" path="/" handler={Root} stuff="test" />
);
