import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authReducer from './auth.reducer';
import historyReducer from './history.reducer';
import itemsReducer from './items.reducer';
import monstersReducer from './monsters.reducer';

export default combineReducers({
  routing,
  authState: authReducer,
  historyState: historyReducer,
  itemsState: itemsReducer,
  monstersState: monstersReducer,
});
