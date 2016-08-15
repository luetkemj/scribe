import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import App from './containers/app/app.container';
import ItemsContainer from './containers/items/items.container';
import ItemDetailsContainer from './containers/items/item-details/item-details.container';
import MonstersContainer from './containers/monsters/monsters.container';
import MonsterDetailsContainer from './containers/monster-details/monster-details.container';

const store = configureStore(undefined, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="items" component={ItemsContainer} />
        <Route path="items/:id" component={ItemDetailsContainer} />
        <Route path="monsters" component={MonstersContainer} />
        <Route path="monsters/:id" component={MonsterDetailsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
