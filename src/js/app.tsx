import App from 'App/components/App';
import React, {Context} from 'react';
import ReactDOM from 'react-dom';
import store from 'App/store';
import {StoreContext} from 'redux-react-hook';

const root = document.createElement('div');
document.body.appendChild(root);

// TODO: This is weird...
const S = (StoreContext as any) as Context<typeof store>;

ReactDOM.render(
  <S.Provider value={store}>
    <App />
  </S.Provider>,
  root,
);
