import { cloneDeep, find, indexOf } from 'lodash';
import logReducer from './log.reducer.js';
import {
  LOADING_LOGS_INITIATED,
  LOGS_ALREADY_LOADED,
  LOADING_LOGS_SUCCESS,
  LOADING_LOGS_ERROR,

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
      const updatedLogs = cloneDeep(action.logs);
      let index = 0;
      for (let log of updatedLogs) {
        // here we send the same action.type we started with but pass notes on the action to our
        // logReducer
        log = logReducer(log, {
          type: action.type,
          notes: log.notes,
        });

        // update the logs after all that reducer-fu
        updatedLogs[index] = log;

        index += 1;
      }

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
    case LOADING_LOG_INITIATED:
    case LOG_ALREADY_LOADED:
    case LOADING_LOG_SUCCESS:
    case LOADING_LOG_ERROR:
    case UPDATING_LOG_INITIATED:
    case UPDATING_LOG_SUCCESS:
    case UPDATING_LOG_ERROR:
    case CREATING_LOG_INITIATED:
    case CREATING_LOG_SUCCESS:
    case CREATING_LOG_ERROR:
    case DELETING_LOG_INITIATED:
    case DELETING_LOG_SUCCESS:
    case DELETING_LOG_ERROR:
    case CREATE_NOTE:
    case UPDATE_NOTE:
    case DELETE_NOTE: {
      const updatedState = cloneDeep(state);
      const { log: initialLog } = action;

      // grab the log which we will modify
      let log = find(updatedState.logs, ['_id', initialLog._id]);

      // if we can't find a log, bail!
      if (!log) {
        logger.log('history.reducer: No log found!');
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
    default:
      return state;
  }
}
