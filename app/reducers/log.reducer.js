import { cloneDeep, find, indexOf, each } from 'lodash';
import noteReducer from './note.reducer';
import {
  LOADING_LOGS_SUCCESS,
  UPDATING_LOG_INITIATED,
  UPDATING_LOG_SUCCESS,
  UPDATING_LOG_ERROR,
  CREATING_LOG_INITIATED,
  CREATING_LOG_SUCCESS,
  CREATING_LOG_ERROR,
  DELETING_LOGS_INITIATED,
  DELETING_LOGS_SUCCESS,
  DELETING_LOGS_ERROR,

  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from '../constants/action-types';

const initialState = {
  loading: false,
  error: null,
};

export default function logReducer(state = initialState, action) {
  switch (action.type) {
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
    case DELETING_LOGS_INITIATED:
      return Object.assign({}, state, {
        loading: true,
      });
    case DELETING_LOGS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
      });
    case DELETING_LOGS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });

    case LOADING_LOGS_SUCCESS: {
      // we need to add some state to our notes. Since they are deep in state we do some
      // child-reducer-fu iterating over all of our notes.
      const tempNotes = cloneDeep(action.notes);
      const updatedNotes = [];
      // here we send the same action.type we started with but pass each note on the action to our
      // noteReducer
      each(tempNotes, (note) => {
        updatedNotes.push(
          logReducer(note, {
            type: action.type,
            note,
          }));
      });

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
