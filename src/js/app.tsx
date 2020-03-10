import App from 'App/components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'App/store';
import {Provider} from 'react-redux';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
