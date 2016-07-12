import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers/root.reducer';

const logger = createLogger({
  // only log when in development environment
  predicate: () => process.env.NODE_ENV === 'development',
});

function configureStore(initialState, history) {
  const middleware = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    logger,
  );

  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/root.reducer', () => {
      const nextReducer = require('../reducers/root.reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configureStore;
