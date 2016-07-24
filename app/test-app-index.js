import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TestApp from './containers/test/test-app/test-app.container';
import TestHomeContainer from './containers/test/test-home/test-home.container';
import MonsterDetailsTestContainer from './containers/test/monster-details-test.container';
import SpinnerTestContainer from './containers/test/spinner-test.container';
import ListItemTestContainer from './containers/test/list-item-test.container';

render(
  <Router history={browserHistory}>
    <Route path="/" component={TestApp}>
      <IndexRoute component={TestHomeContainer} />
      <Route path="monster-details" component={MonsterDetailsTestContainer} />
      <Route path="spinner" component={SpinnerTestContainer} />
      <Route path="list-item" component={ListItemTestContainer} />
    </Route>
  </Router>,
  document.getElementById('app')
);
