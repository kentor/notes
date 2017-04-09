import RootReducer from './reducers/RootReducer';
import { applyMiddleware, createStore } from 'redux';

const middlewares = [
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger')({
    actionTransformer(action) {
      return Object.assign({}, action, { type: String(action.type) });
    },
    stateTransformer(state) {
      return state.toJS();
    },
  }));
}

// TODO: hot module replacement for reducers

export default createStore(RootReducer, applyMiddleware(...middlewares));
