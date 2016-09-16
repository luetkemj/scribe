import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TestApp from './containers/test/test-app/test-app.container';
import TestHomeContainer from './containers/test/test-home/test-home.container';

import AbilityScoresTestContainer from './containers/test/ability-scores-test.container';
import DefinitionListTestContainer from './containers/test/definition-list-test.container';
import HeaderTestContainer from './containers/test/header-test.container';
import ItemFormTestContainer from './containers/test/item-form-test.container';
import ListItemTestContainer from './containers/test/list-item-test.container';
import MonsterDetailsTestContainer from './containers/test/monster-details-test.container';
import SidebarTestContainer from './containers/test/sidebar-test.container';
import SpinnerTestContainer from './containers/test/spinner-test.container';


render(
  <Router history={browserHistory}>
    <Route path="/" component={TestApp}>
      <IndexRoute component={TestHomeContainer} />
      <Route path="ability-scores" component={AbilityScoresTestContainer} />
      <Route path="definition-list" component={DefinitionListTestContainer} />
      <Route path="header" component={HeaderTestContainer} />
      <Route path="item-form" component={ItemFormTestContainer} />
      <Route path="list-item" component={ListItemTestContainer} />
      <Route path="monster-details" component={MonsterDetailsTestContainer} />
      <Route path="sidebar" component={SidebarTestContainer} />
      <Route path="spinner" component={SpinnerTestContainer} />
    </Route>
  </Router>,
  document.getElementById('app')
);
