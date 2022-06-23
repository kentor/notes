import App from 'App/components/App';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from 'App/store';

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
