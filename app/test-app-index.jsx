import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TestApp from './containers/test/test-app/test-app.container';
import TestHomeContainer from './containers/test/test-home/test-home.container';

import AbilityScoresTestContainer from './containers/test/ability-scores-test.container';
import DefinitionListTestContainer from './containers/test/definition-list-test.container';
import ListItemTestContainer from './containers/test/list-item-test.container';
import LogTestContainer from './containers/test/log-test.container';
import LoginFormTestContainer from './containers/test/login-form-test.container';
import NoteTestContainer from './containers/test/note-test.container';
import SpinnerTestContainer from './containers/test/spinner-test.container';
import TerrainPickerTestContainer from './containers/test/terrain-picker-test.container';
import TimeKeeperTestContainer from './containers/test/time-keeper-test.container';
import WeatherTrackerTestContainer from './containers/test/weather-tracker-test.container';


render(
  <Router history={browserHistory}>
    <Route path="/" component={TestApp}>
      <IndexRoute component={TestHomeContainer} />
      <Route path="ability-scores" component={AbilityScoresTestContainer} />
      <Route path="definition-list" component={DefinitionListTestContainer} />
      <Route path="list-item" component={ListItemTestContainer} />
      <Route path="log" component={LogTestContainer} />
      <Route path="login-form" component={LoginFormTestContainer} />
      <Route path="note" component={NoteTestContainer} />
      <Route path="spinner" component={SpinnerTestContainer} />
      <Route path="terrain-picker" component={TerrainPickerTestContainer} />
      <Route path="time-keeper" component={TimeKeeperTestContainer} />
      <Route path="weather-tracker" component={WeatherTrackerTestContainer} />
    </Route>
  </Router>,
  document.getElementById('app'),
);
