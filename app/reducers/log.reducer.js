import { cloneDeep, find, indexOf } from 'lodash';
import noteReducer from './note.reducer.js';
import {
  LOADING_LOGS_SUCCESS,
  LOADING_LOG_INITIATED,
  LOG_ALREADY_LOADED,
  LOADING_LOG_SUCCESS,
  LOADING_LOG_ERROR,
  UPDATING_LOG_INITIATED,
  UPDATING_LOG_SUCCESS,
  UPDATING_LOG_ERROR,
  CREATING_LOG_INITIATED,
  CREATING_LOG_SUCCESS,
  CREATING_LOG_ERROR,
  DELETING_LOG_INITIATED,
  DELETING_LOG_SUCCESS,
  DELETING_LOG_ERROR,

  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
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
    case UPDATING_LOG_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case UPDATING_LOG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        ...action.log,
      });
    case UPDATING_LOG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case CREATING_LOG_INITIATED:
      return Object.assign({}, state, {
        loading: true,
      });
    case CREATING_LOG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        ...action.log,
      });
    case CREATING_LOG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case DELETING_LOG_INITIATED:
      return Object.assign({}, state, {
        loading: true,
      });
    case DELETING_LOG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        ...action.log,
      });
    case DELETING_LOG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });

    case LOADING_LOGS_SUCCESS: {
      // we need to add some state to our notes. Since they are deep in state we do some
      // child-reducer-fu iterating over all of our notes.
      const updatedNotes = cloneDeep(action.notes);
      let index = 0;
      // here we send the same action.type we started with but pass each note on the action to our
      // noteReducer
      for (let note of updatedNotes) {
        note = noteReducer(note, {
          type: action.type,
          note,
        });
        // update the Notes after all that reducer-fu
        updatedNotes[index] = note;

        index += 1;
      }

      return Object.assign({}, state, {
        notes: updatedNotes,
      });
    }

    case CREATE_NOTE:
    case UPDATE_NOTE:
    case DELETE_NOTE: {
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
