import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

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

function updateCampaignInitiated() {
  return { type: UPDATE_CAMPAIGN_INITIATED };
}

function updateCampaignError(error) {
  return {
    type: UPDATE_CAMPAIGN_ERROR,
    error,
  };
}

function updateCampaignSuccess(campaign) {
  return {
    type: UPDATE_CAMPAIGN_SUCCESS,
    campaign,
  };
}

function deleteCampaignInitiated() {
  return { type: DELETE_CAMPAIGN_INITIATED };
}

function deleteCampaignError(error) {
  return {
    type: DELETE_CAMPAIGN_ERROR,
    error,
  };
}

function deleteCampaignSuccess(campaign) {
  return {
    type: DELETE_CAMPAIGN_SUCCESS,
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
    .then(campaign => dispatch(loadCampaignSuccess(campaign)))
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
    const { campaignsState } = getState();

    if (find(campaignsState.campaigns, { _id: id })) {
      return dispatch(campaignAlreadyLoaded());
    }

    return loadCampaign(id, dispatch);
  };
}

export function loadCampaignsIfNeeded() {
  return (dispatch, getState) => {
    const { campaignsState } = getState();

    /*
    @TODO: check if the campaigns in state belong to the current user. We should clear state and
    start over if they do not. At time of writtinfg there is no campaignState written.
    */
    if (campaignsState.campaigns.length) {
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

export function updateCampaign(campaign) {
  return (dispatch) => {
    dispatch(updateCampaignInitiated(campaign));

    const uri = `/api/secure/campaigns/${campaign.id}`;
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'PATCH',
      body: JSON.stringify(campaign),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(updatedCampaign => dispatch(updateCampaignSuccess(updatedCampaign)))
      .catch(error => handleHttpError(dispatch, error, updateCampaignError));
  };
}

export function deleteCampaign(campaign) {
  return (dispatch) => {
    dispatch(deleteCampaignInitiated(campaign));

    const uri = `/api/secure/campaigns/${campaign.id}`;
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'DELETE',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(deletedCampaign => dispatch(deleteCampaignSuccess(deletedCampaign)))
      .catch(error => handleHttpError(dispatch, error, deleteCampaignError));
  };
}
