import should from 'should';

import reducer from '../../../app/reducers/campaign.reducer';
import * as types from '../../../app/constants/action-types';

describe('the campaign reducer', () => {
  let state;

  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have the correct inital state', () => {
    should(reducer(undefined, {})).deepEqual({
      loading: false,
      error: null,
      campaigns: [],
      campaign: {},
    });
  });

  describe('in the inital state', () => {
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle CREATE_CAMPAIGN_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.CREATE_CAMPAIGN_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle DELETE_CAMPAIGN_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.DELETE_CAMPAIGN_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle UPDATE_CAMPAIGN_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.UPDATE_CAMPAIGN_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle LOAD_CAMPAIGN_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOAD_CAMPAIGN_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle LOAD_CAMPAIGNS_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOAD_CAMPAIGNS_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle CAMPAIGN_ALREADY_LOADED correctly', () => {
      should(reducer(state, {
        type: types.CAMPAIGN_ALREADY_LOADED,
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle CAMPAIGNS_ALREADY_LOADED correctly', () => {
      should(reducer(state, {
        type: types.CAMPAIGNS_ALREADY_LOADED,
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [],
        campaign: {},
      });
    });
  });

  describe('when loading', () => {
    beforeEach(() => {
      state = reducer({
        loading: true,
        error: null,
        campaigns: [],
        campaign: {},
      }, {});
    });

    it('should handle CREATE_CAMPAIGN_ERROR correctly', () => {
      should(reducer(state, {
        type: types.CREATE_CAMPAIGN_ERROR,
        error: 'error!',
      })).deepEqual({
        loading: false,
        error: 'error!',
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle DELETE_CAMPAIGN_ERROR correctly', () => {
      should(reducer(state, {
        type: types.DELETE_CAMPAIGN_ERROR,
        error: 'error!',
      })).deepEqual({
        loading: false,
        error: 'error!',
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle UPDATE_CAMPAIGN_ERROR correctly', () => {
      should(reducer(state, {
        type: types.UPDATE_CAMPAIGN_ERROR,
        error: 'error!',
      })).deepEqual({
        loading: false,
        error: 'error!',
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle LOAD_CAMPAIGN_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOAD_CAMPAIGN_ERROR,
        error: 'error!',
      })).deepEqual({
        loading: false,
        error: 'error!',
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle LOAD_CAMPAIGNS_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOAD_CAMPAIGNS_ERROR,
        error: 'error!',
      })).deepEqual({
        loading: false,
        error: 'error!',
        campaigns: [],
        campaign: {},
      });
    });

    it('should handle LOAD_CAMPAIGN_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOAD_CAMPAIGN_SUCCESS,
        campaign: { name: 'a' },
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [],
        campaign: { name: 'a' },
      });
    });

    it('should handle LOAD_CAMPAIGNS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOAD_CAMPAIGNS_SUCCESS,
        campaigns: [{ name: 'a' }, { name: 'b' }],
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [{ name: 'a' }, { name: 'b' }],
        campaign: {},
      });
    });
  });

  describe('when campaigns exist while loading', () => {
    beforeEach(() => {
      state = reducer({
        loading: true,
        error: null,
        campaigns: [
          { name: 'a' },
          { name: 'c' },
        ],
        campaign: { name: 'd' },
      }, {});
    });

    it('should handle CREATE_CAMPAIGN_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.CREATE_CAMPAIGN_SUCCESS,
        campaign: { name: 'e' },
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [
          { name: 'a' },
          { name: 'c' },
          { name: 'e' },
        ],
        campaign: { name: 'd' },
      });
    });

    it('should handle DELETE_CAMPAIGN_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.DELETE_CAMPAIGN_SUCCESS,
        campaign: { name: 'c' },
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [
          { name: 'a' },
        ],
        campaign: { name: 'd' },
      });
    });

    it('should handle UPDATE_CAMPAIGN_SUCCESS correctly', () => {
      should(reducer({
        loading: true,
        error: null,
        campaigns: [
          { name: 'a', id: 1 },
          { name: 'c', id: 2 },
        ],
        campaign: { name: 'd', id: 3 },
      }, {
        type: types.UPDATE_CAMPAIGN_SUCCESS,
        campaign: { name: 'e', id: 2 },
      })).deepEqual({
        loading: false,
        error: null,
        campaigns: [
          { name: 'a', id: 1 },
          { name: 'e', id: 2 },
        ],
        campaign: { name: 'd', id: 3 },
      });
    });
  });
});
