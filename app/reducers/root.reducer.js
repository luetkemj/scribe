import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import historyReducer from './history.reducer';
import itemsReducer from './items.reducer';
import monstersReducer from './monsters.reducer';

export default combineReducers({
  routing,
  historyState: historyReducer,
  itemsState: itemsReducer,
  monstersState: monstersReducer,
});
