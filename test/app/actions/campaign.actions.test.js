import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as campaignActions from '../../../app/actions/campaign.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('campaignActions', () => {
  const CREATE_CAMPAIGN_URL = '/api/secure/campaigns';
  const LOAD_CAMPAIGN_URL = '/api/secure/campaigns/1';
  const LOAD_CAMPAIGNS_URL = '/api/secure/campaigns';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(campaignActions);
  });

  describe('loadCampaignIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOAD_CAMPAIGN_URL, {
          status: 200,
          body: { _id: 1 },
        });
      });

      describe('when campaign exists', () => {
        beforeEach(() => {
          store = mockStore({
            campaignState: ({
              campaign: { _id: 1 },
            }),
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(campaignActions.loadCampaignIfNeeded(1));
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CAMPAIGN_ALREADY_LOADED);
          should(actions[1].payload.method).equal('push');
        });
      });

      describe('when campaign does not exist', () => {
        beforeEach(() => {
          store = mockStore({
            campaignState: ({
              campaign: { _id: 2 },
            }),
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(campaignActions.loadCampaignIfNeeded(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(3);
            should(actions[0].type).equal(types.LOAD_CAMPAIGN_INITIATED);
            should(actions[1].type).equal(types.LOAD_CAMPAIGN_SUCCESS);
            should(actions[1].campaign).deepEqual({ _id: 1 });
            should(actions[2].payload.method).equal('push');
          })
          .then(done)
          .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          campaignState: {
            campaign: {},
          },
        });
        fetchMock.mock(LOAD_CAMPAIGN_URL, 500);
      });

      it('should dispatch properly', (done) => {
        store.dispatch(campaignActions.loadCampaignIfNeeded(1))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOAD_CAMPAIGN_INITIATED);
          should(actions[1].type).equal(types.LOAD_CAMPAIGN_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('loadCampaignsIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOAD_CAMPAIGNS_URL, {
          status: 200,
          body: [{ _id: 1 }, { _id: 2 }],
        });
      });

      describe('when campaigns exist', () => {
        beforeEach(() => {
          store = mockStore({
            campaignState: ({
              campaigns: [{ _id: 1 }],
            }),
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(campaignActions.loadCampaignsIfNeeded());
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.CAMPAIGNS_ALREADY_LOADED);
        });
      });

      describe('when campaigns do not exist', () => {
        beforeEach(() => {
          store = mockStore({
            campaignState: ({
              campaigns: [],
            }),
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(campaignActions.loadCampaignsIfNeeded())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOAD_CAMPAIGNS_INITIATED);
            should(actions[1].type).equal(types.LOAD_CAMPAIGNS_SUCCESS);
            should(actions[1].campaigns).deepEqual([{ _id: 1 }, { _id: 2 }]);
          })
          .then(done)
          .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          campaignState: {
            campaigns: [],
          },
        });
        fetchMock.mock(LOAD_CAMPAIGNS_URL, 500);
      });

      it('should dispatch properly', (done) => {
        store.dispatch(campaignActions.loadCampaignsIfNeeded())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOAD_CAMPAIGNS_INITIATED);
          should(actions[1].type).equal(types.LOAD_CAMPAIGNS_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('createCampaign', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_CAMPAIGN_URL, {
          method: 'POST',
          status: 200,
          body: { _id: 1 },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(campaignActions.createCampaign())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATE_CAMPAIGN_INITIATED);
          should(actions[1].type).equal(types.CREATE_CAMPAIGN_SUCCESS);
          should(actions[1].campaign).deepEqual({ _id: 1 });
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_CAMPAIGN_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(campaignActions.createCampaign())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATE_CAMPAIGN_INITIATED);
          should(actions[1].type).equal(types.CREATE_CAMPAIGN_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
});
