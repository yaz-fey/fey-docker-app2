import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Named export olarak import edilmeli
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
