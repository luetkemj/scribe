import { cloneDeep, find, indexOf } from 'lodash';
import noteReducer from './note.reducer.js';
import {
  LOADING_LOG_INITIATED,
  LOG_ALREADY_LOADED,
  LOADING_LOG_SUCCESS,
  LOADING_LOG_ERROR,
  SAVING_LOG_INITIATED,
  SAVING_LOG_SUCCESS,
  SAVING_LOG_ERROR,
  SAVING_NOTE_INITIATED,
  SAVING_NOTE_SUCCESS,
  SAVING_NOTE_ERROR,
} from '../constants/action-types';

const logger = require('../../server/lib/logger')();

const initialState = {
  loading: false,
  error: null,
};

export default function logReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_LOG_INITIATED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOG_ALREADY_LOADED:
      return Object.assign({}, state, {
        loading: false,
      });
    case LOADING_LOG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        ...action.log,
      });
    case LOADING_LOG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case SAVING_LOG_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case SAVING_LOG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        ...action.log,
      });
    case SAVING_LOG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });

    case SAVING_NOTE_INITIATED:
    case SAVING_NOTE_SUCCESS:
    case SAVING_NOTE_ERROR: {
      const updatedState = cloneDeep(state);
      const { noteId } = action;

      // grab the note which we will modify
      let note = find(updatedState.notes, ['_id', noteId]);

      // if we can't find a note - bail.
      if (!note) {
        logger.log('log.reducer: No note found!');
        return state;
      }

      // cache the index of the note we are modiying
      const index = indexOf(updatedState.notes, note);

      // update the product guide based on the action
      note = noteReducer(note, action);

      // update our state with this new product guide
      updatedState.notes[index] = note;

      return updatedState;
    }
    default:
      return state;
  }
}
