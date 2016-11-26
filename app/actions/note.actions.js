import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from '../constants/action-types';

export function createNote(note) {
  const actions = {
    type: CREATE_NOTE,
    ...note,
  };

  return dispatch => dispatch(actions);
}

export function updateNote(note) {
  const actions = {
    type: UPDATE_NOTE,
    ...note,
  };

  return dispatch => dispatch(actions);
}

export function deleteNote() {
  const actions = {
    type: DELETE_NOTE,
    note: null,
  };

  return dispatch => dispatch(actions);
}
