import { push } from 'react-router-redux';

import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

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
} from '../constants/action-types';

function createCampaignInitiated() {
  return { type: CREATE_CAMPAIGN_INITIATED };
}

function createCampaignError(error) {
  return {
    type: CREATE_CAMPAIGN_ERROR,
    error,
  };
}

function createCampaignSuccess(campaign) {
  return {
    type: CREATE_CAMPAIGN_SUCCESS,
    campaign,
  };
}

function loadCampaignInitiated() {
  return { type: LOAD_CAMPAIGN_INITIATED };
}

function loadCampaignError(error) {
  return {
    type: LOAD_CAMPAIGN_ERROR,
    error,
  };
}

function loadCampaignSuccess(campaign) {
  return {
    type: LOAD_CAMPAIGN_SUCCESS,
    campaign,
  };
}

function campaignAlreadyLoaded() {
  return { type: CAMPAIGN_ALREADY_LOADED };
}

function loadCampaignsInitiated() {
  return { type: LOAD_CAMPAIGNS_INITIATED };
}

function loadCampaignsError(error) {
  return {
    type: LOAD_CAMPAIGNS_ERROR,
    error,
  };
}

function loadCampaignsSuccess(campaigns) {
  return {
    type: LOAD_CAMPAIGNS_SUCCESS,
    campaigns,
  };
}

function campaignsAlreadyLoaded() {
  return { type: CAMPAIGNS_ALREADY_LOADED };
}

function loadCampaign(id, dispatch) {
  dispatch(loadCampaignInitiated());

  const uri = `/api/secure/campaigns/${id}`;
  const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
    method: 'GET',
  });

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(response => response.json())
    .then((campaign) => {
      dispatch(loadCampaignSuccess(campaign));
      dispatch(push('/campaign'));
    })
    .catch(error => handleHttpError(dispatch, error, loadCampaignError));
}

function loadCampaigns(dispatch) {
  dispatch(loadCampaignsInitiated());

  const uri = '/api/secure/campaigns';
  const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
    method: 'GET',
  });

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(response => response.json())
    .then(campaigns => dispatch(loadCampaignsSuccess(campaigns)))
    .catch(error => handleHttpError(dispatch, error, loadCampaignsError));
}

export function loadCampaignIfNeeded(id) {
  return (dispatch, getState) => {
    const { campaignState } = getState();

    if (campaignState.campaign._id === id) {
      dispatch(campaignAlreadyLoaded());
      return dispatch(push('/campaign'));
    }

    return loadCampaign(id, dispatch);
  };
}

export function loadCampaignsIfNeeded() {
  return (dispatch, getState) => {
    const { campaignState } = getState();

    if (campaignState.campaigns.length) {
      return dispatch(campaignsAlreadyLoaded());
    }

    return loadCampaigns(dispatch);
  };
}

export function createCampaign(campaign) {
  return (dispatch) => {
    dispatch(createCampaignInitiated());

    const uri = '/api/secure/campaigns';
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify(campaign),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(createdCampaign => dispatch(createCampaignSuccess(createdCampaign)))
      .catch(error => handleHttpError(dispatch, error, createCampaignError));
  };
}
