import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import App from './containers/app/app.container';
import CampaignContainer from './containers/campaign/campaign.container';
import CampaignsContainer from './containers/campaigns/campaigns.container';
import ItemsContainer from './containers/items/items.container';
import ItemDetailsContainer from './containers/items/item-details/item-details.container';
import LoginContainer from './containers/login/login.container';
import MonstersContainer from './containers/monsters/monsters.container';
import MonsterDetailsContainer from './containers/monsters/monster-details/monster-details.container';

const store = configureStore(undefined, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="login" component={LoginContainer} />
        <Route path="items" component={ItemsContainer}>
          <Route path=":id" component={ItemDetailsContainer} />
        </Route>
        <Route path="monsters" component={MonstersContainer}>
          <Route path=":id" component={MonsterDetailsContainer} />
        </Route>
        <Route path="campaign" component={CampaignContainer} />
        <Route path="campaigns" component={CampaignsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
