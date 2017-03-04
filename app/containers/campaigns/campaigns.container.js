import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import Spinner from '../../components/spinner/spinner.component';
import { loadCampaignsIfNeeded, loadCampaignIfNeeded, createCampaign } from '../../actions/campaign.actions';
import style from './campaigns.container.scss';

class CampaignsContainer extends Component {
  state = {
    addCampaign: false,
    newCampaign: '',
  }

  componentWillMount() {
    this.props.loadCampaignsIfNeeded();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCreateCampaign = () => {
    this.toggleForm();

    this.props.createCampaign({
      name: this.state.newCampaign,
    });
  }

  toggleForm = () => {
    this.setState({
      addCampaign: !this.state.addCampaign,
      newCampaign: '',
    });
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

    let addCampaignForm;
    let buttons = (
      <button className={style.addCampaignButton} onClick={this.toggleForm}>
        New Campaign
      </button>
    );

    if (this.state.addCampaign) {
      addCampaignForm = (
        <form className={style.form}>
          <input
            className={style.input}
            name="newCampaign"
            value={this.state.newCampaign}
            onChange={this.handleChange}
            placeholder="Campaign Name"
          />
        </form>
      );

      buttons = (
        <div className={style.buttons}>
          <button
            className={style.cancel}
            onClick={this.toggleForm}
          >CANCEL
          </button> | <button
            className={style.create}
            onClick={this.handleCreateCampaign}
          >CREATE
          </button>
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
          <div className={style.headingContainer}>
            <div className={style.heading}>Campaigns</div>
            {buttons}
          </div>
          <div className={style.campaigns}>
            {addCampaignForm}
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
  createCampaign: PropTypes.func.isRequired,
  campaignState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    campaigns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    campaignState: state.campaignState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadCampaignsIfNeeded,
    loadCampaignIfNeeded,
    createCampaign,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignsContainer);
