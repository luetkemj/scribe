import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import itemsReducer from './items.reducer';
import monstersReducer from './monsters.reducer';

export default combineReducers({
  routing,
  monstersState: monstersReducer,
  itemsState: itemsReducer,
});
