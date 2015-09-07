import './polyfills';

import FastClick from 'fastclick';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import store from './store';
import { Provider } from 'react-redux';

Router.run(routes, Handler => {
  React.render(
    <Provider store={store}>
      {() => <Handler />}
    </Provider>,
    document.getElementById('root')
  );
});

FastClick(document.body);
