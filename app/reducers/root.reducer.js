import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import {
  LOG_OUT_SUCCESS,
} from '../constants/action-types';

import authReducer from './auth.reducer';
import campaignReducer from './campaign.reducer';
import eventsQueueReducer from './events-queue.reducer';
import historyReducer from './history.reducer';
import itemsReducer from './items.reducer';
import monstersReducer from './monsters.reducer';

const appReducer = combineReducers({
  routing,
  authState: authReducer,
  campaignState: campaignReducer,
  eventsQueueState: eventsQueueReducer,
  historyState: historyReducer,
  itemsState: itemsReducer,
  monstersState: monstersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT_SUCCESS) {
    state = undefined; // eslint-disable-line
  }

  return appReducer(state, action);
};

export default rootReducer;
