import { cloneDeep, chain, find, without, indexOf } from 'lodash';

import {
  CREATE_CAMPAIGN_INITIATED,
  CREATE_CAMPAIGN_ERROR,
  CREATE_CAMPAIGN_SUCCESS,

  DELETE_CAMPAIGN_INITIATED,
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_SUCCESS,

  UPDATE_CAMPAIGN_INITIATED,
  UPDATE_CAMPAIGN_ERROR,
  UPDATE_CAMPAIGN_SUCCESS,

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
    case DELETE_CAMPAIGN_INITIATED:
    case UPDATE_CAMPAIGN_INITIATED:
    case LOAD_CAMPAIGN_INITIATED:
    case LOAD_CAMPAIGNS_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case CREATE_CAMPAIGN_ERROR:
    case DELETE_CAMPAIGN_ERROR:
    case UPDATE_CAMPAIGN_ERROR:
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

    case DELETE_CAMPAIGN_SUCCESS: {
      const updatedState = cloneDeep(state);
      // find the campaign we deleted in state
      const campaign = find(updatedState.campaigns, ['name', action.campaign.name]);
      // if we can't find the campaign, bail!
      if (!campaign) {
        return state;
      }
      // get campaigns without the one we just deleted
      const campaigns = without(updatedState.campaigns, campaign);

      // update state
      return Object.assign({}, updatedState, {
        loading: false,
        error: null,
        campaigns,
      });
    }

    case UPDATE_CAMPAIGN_SUCCESS: {
      const updatedState = cloneDeep(state);
      // find the campaign we are updating
      const campaign = find(updatedState.campaigns, ['id', action.campaign.id]);

      // cache the index of the campaign we are modiying
      const index = indexOf(updatedState.campaigns, campaign);

      // update our state with this new product guide
      updatedState.campaigns[index] = action.campaign;

      return Object.assign({}, updatedState, {
        loading: false,
        error: null,
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
