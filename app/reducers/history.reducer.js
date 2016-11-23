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
    case LOADING_LOGS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        logs: action.logs,
      });
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
    case SAVING_LOG_INITIATED:
    case SAVING_LOG_SUCCESS:
    case SAVING_LOG_ERROR:
    case SAVING_NOTE_INITIATED:
    case SAVING_NOTE_SUCCESS:
    case SAVING_NOTE_ERROR: {
      const updatedState = cloneDeep(state);
      const { logId } = action;

      // grab the log which we will modify
      let log = find(updatedState.logs, ['_id', logId]);

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
