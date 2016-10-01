import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import store from './store';
import { Provider } from 'react-redux';

if (module.hot) {
  module.hot.setUpdateMode('websocket', {
    url: `http://${location.hostname}:3123`,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
