import {
  SAVING_NOTE_INITIATED,
  SAVING_NOTE_SUCCESS,
  SAVING_NOTE_ERROR,
} from '../constants/action-types';

const initialState = {
  error: null,
};

export default function noteReducer(state = initialState, action) {
  switch (action.type) {
    case SAVING_NOTE_INITIATED:
      return Object.assign({}, state, {
        error: null,
      });
    case SAVING_NOTE_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        ...action.note,
      });
    case SAVING_NOTE_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
}
