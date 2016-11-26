import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from '../constants/action-types';

const initialState = {};

export default function noteReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      return Object.assign({}, state, {
        ...action.note,
      });
    case UPDATE_NOTE:
      return Object.assign({}, state, {
        ...action.note,
      });
    case DELETE_NOTE:
      return Object.assign({}, state, {
        ...action.note,
      });
    default:
      return state;
  }
}
