import {createStore} from 'redux';
import rootReducer from 'App/reducers/rootReducer';

const store = createStore(
  rootReducer,
  rootReducer(undefined, {type: 'Init'}),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
