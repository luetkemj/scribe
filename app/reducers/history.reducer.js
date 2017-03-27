import { cloneDeep, find, pullAllBy, indexOf, each } from 'lodash';
import logReducer from './log.reducer';
import {
  LOADING_LOGS_INITIATED,
  LOGS_ALREADY_LOADED,
  LOADING_LOGS_SUCCESS,
  LOADING_LOGS_ERROR,
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
  // Shared action types
  LOAD_CAMPAIGN_SUCCESS,
} from '../constants/action-types';

const initialState = {
  loading: false,
  error: null,
  logs: [],
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_LOGS_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case LOGS_ALREADY_LOADED:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case LOADING_LOGS_SUCCESS: {
      // we need to add some state to our notes. Since they are deep in state we do some
      // child-reducer-fu iterating over all of our logs and their notes.
      const tempLogs = cloneDeep(action.logs);
      const updatedLogs = [];

      each(tempLogs, (log) => {
        updatedLogs.push(
          logReducer(log, {
            type: action.type,
            notes: log.notes,
          }));
      });

      return Object.assign({}, state, {
        loading: false,
        error: null,
        logs: updatedLogs,
      });
    }
    case LOADING_LOGS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        logs: [],
      });
    case CREATING_LOG_INITIATED:
      return Object.assign({}, state, {
        loading: true,
      });
    case CREATING_LOG_SUCCESS: {
      const tempLogs = [];
      const logs = tempLogs.concat(action.log, state.logs);

      return Object.assign({}, state, {
        loading: false,
        logs,
      });
    }
    case CREATING_LOG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case DELETING_LOGS_INITIATED:
      return Object.assign({}, state, {
        loading: true,
      });
    case DELETING_LOGS_SUCCESS: {
      const logs = cloneDeep(state.logs);
      const logsToDelete = [];
      each(action.deletedLogs, logId => logsToDelete.push({ _id: logId }));
      pullAllBy(logs, logsToDelete, '_id');

      return Object.assign({}, state, {
        loading: false,
        logs,
      });
    }
    case DELETING_LOGS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case UPDATING_LOG_INITIATED:
    case UPDATING_LOG_SUCCESS:
    case UPDATING_LOG_ERROR:
    case CREATE_NOTE:
    case UPDATE_NOTE:
    case DELETE_NOTE: {
      const updatedState = cloneDeep(state);
      const { log: initialLog } = action;

      // grab the log which we will modify
      let log = find(updatedState.logs, ['_id', initialLog._id]);

      // if we can't find a log, bail!
      if (!log) {
        return state;
      }

      // cache the index of the note we are modiying
      const index = indexOf(updatedState.logs, log);

      // update the product guide based on the action
      log = logReducer(log, action);

      // update our state with this new product guide
      updatedState.logs[index] = log;

      return updatedState;
    }
    case LOAD_CAMPAIGN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        logs: [],
      });
    default:
      return state;
  }
}
