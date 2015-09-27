import './polyfills';

import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root')
);

FastClick(document.body);
