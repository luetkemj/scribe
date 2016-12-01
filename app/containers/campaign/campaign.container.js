import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LogContainer from './log/log.container.js';

import { loadLogsIfNeeded } from '../../actions/history.actions';
import style from './campaign.container.scss';

class CampaignContainer extends Component {
  componentWillMount() {
    this.props.loadLogsIfNeeded();
  }

  render() {
    const { logs } = this.props.historyState;

    let logsToRender;

    if (logs.length) {
      logsToRender = logs.map(log => (
        <LogContainer
          key={log._id}
          log={log}
        />
      ));
    }

    return (
      <div className={style.campaignContainer}>
        <div className={style.workTable} />
        <div className={style.history}>
          {logsToRender}
        </div>
      </div>
    );
  }
}

CampaignContainer.propTypes = {
  historyState: PropTypes.object.isRequired,
  loadLogsIfNeeded: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    historyState: state.historyState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadLogsIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignContainer);
