import { cloneDeep, chain } from 'lodash';

import {
  CREATE_CAMPAIGN_INITIATED,
  CREATE_CAMPAIGN_ERROR,
  CREATE_CAMPAIGN_SUCCESS,

  LOAD_CAMPAIGN_INITIATED,
  LOAD_CAMPAIGN_ERROR,
  LOAD_CAMPAIGN_SUCCESS,
  CAMPAIGN_ALREADY_LOADED,

  LOAD_CAMPAIGNS_INITIATED,
  LOAD_CAMPAIGNS_ERROR,
  LOAD_CAMPAIGNS_SUCCESS,
  CAMPAIGNS_ALREADY_LOADED,

  // shared action types
  CREATING_LOG_SUCCESS,
} from '../constants/action-types';

const initialState = {
  loading: false,
  error: null,
  campaigns: [],
  campaign: {},
};

export default function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CAMPAIGN_INITIATED:
    case LOAD_CAMPAIGN_INITIATED:
    case LOAD_CAMPAIGNS_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case CREATE_CAMPAIGN_ERROR:
    case LOAD_CAMPAIGN_ERROR:
    case LOAD_CAMPAIGNS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });

    case CAMPAIGN_ALREADY_LOADED:
    case CAMPAIGNS_ALREADY_LOADED:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });

    case CREATE_CAMPAIGN_SUCCESS: {
      const updatedState = cloneDeep(state);
      // add time 0 to new campaign
      const newCampaign = Object.assign({}, action.campaign, { time: 0 });
      // add the new campaign to campaigns state and order by name
      const campaigns = chain(updatedState.campaigns).concat(newCampaign).orderBy('name').value();
      // update new state
      return Object.assign({}, updatedState, {
        loading: false,
        error: null,
        campaigns,
      });
    }

    case LOAD_CAMPAIGN_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        error: null,
        campaign: action.campaign,
      });
    }

    case LOAD_CAMPAIGNS_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        error: null,
        campaigns: action.campaigns,
      });
    }

    case CREATING_LOG_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        error: null,
        campaigns: [],
      });
    }
    default:
      return state;
  }
}
