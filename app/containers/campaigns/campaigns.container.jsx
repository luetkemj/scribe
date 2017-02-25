import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import Spinner from '../../components/spinner/spinner.component';
import { loadCampaignsIfNeeded, loadCampaignIfNeeded } from '../../actions/campaign.actions';
import style from './campaigns.container.scss';

class CampaignsContainer extends Component {
  componentWillMount() {
    this.props.loadCampaignsIfNeeded();
  }

  render() {
    const { loading, error, campaigns } = this.props.campaignState;

    if (loading) {
      return (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.heading}>Campaigns</div>
            <div className={style.campaigns}>
              <Spinner />
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.heading}>Campaigns</div>
            <div className={style.campaigns}>
              {error}
            </div>
          </div>
        </div>
      );
    }

    const campaignsToRender = campaigns.map((campaign) => {
      const time = moment.utc(campaign.time).format('HH:mm:ss');
      const days = moment.utc(0).diff(moment.utc(campaign.time), 'days') + 1;
      return (
        <div className={style.campaign} key={campaign._id}>
          <div>
            <button
              className={style.name}
              onClick={() => this.props.loadCampaignIfNeeded(campaign._id)}
            >{ campaign.name }
            </button>
          </div>
          <div>
            <div className={style.day}>DAY {days}</div>
            <div className={style.time}>{time}</div>
          </div>
        </div>
      );
    });

    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.heading}>Campaigns</div>
          <div className={style.campaigns}>
            {campaignsToRender}
          </div>
        </div>
      </div>
    );
  }
}

CampaignsContainer.propTypes = {
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
  loadCampaignIfNeeded: PropTypes.func.isRequired,
  campaignState: PropTypes.shape({
    loading: PropTypes.bool.isRquired,
    error: PropTypes.string,
    campaigns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
};

function mapStateToProps(state) {
  return {
    campaignState: state.campaignState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCampaignsIfNeeded, loadCampaignIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignsContainer);
