import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import { loadCampaignsIfNeeded } from '../../actions/campaign.actions';
import style from './campaigns.container.scss';

class CampaignsContainer extends Component {
  componentWillMount() {
    this.props.loadCampaignsIfNeeded();
  }

  render() {
    const { loading, error, campaigns } = this.props.campaignState;

    if (loading) {
      return (<Spinner />);
    }

    if (error) {
      return (<div>{error}</div>);
    }

    const campaignsToRender = campaigns.map(campaign =>
      <div className={style.campaign} key={campaign._id}>
        <div>
          <button className={style.name}>{ campaign.name }</button>
        </div>
        <div>
          <div className={style.day}>DAY 12</div>
          <div className={style.time}>16:42:08</div>
          <div className={style.location}>Helmans House</div>
        </div>
      </div>,
    );

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
  return bindActionCreators({ loadCampaignsIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignsContainer);
