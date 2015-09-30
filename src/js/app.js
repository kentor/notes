import './polyfills';

import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import store from './store';
import { Provider } from 'react-redux';

if (module.hot) {
  module.hot.setUpdateMode('websocket', {
    url: `http://${location.hostname}:3123`,
  });
}

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root')
);

FastClick(document.body);
