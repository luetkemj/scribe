import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import App from './containers/app.container';
import MonstersContainer from './containers/monsters.container';
import MonsterDetailsContainer from './containers/monster-details.container';

const store = configureStore(undefined, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="monsters" component={MonstersContainer} />
        <Route path="monsters/:id" component={MonsterDetailsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
