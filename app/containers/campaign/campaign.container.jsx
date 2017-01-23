import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { each } from 'lodash';

import LogContainer from './log/log.container';
import TimeKeeper from '../../components/time-keeper/time-keeper.component';
import WeatherTracker from '../../components/weather-tracker/weather-tracker.component';
import TerrainPicker from '../../components/terrain-picker/terrain-picker.component';

import { loadLogsIfNeeded } from '../../actions/history.actions';
import { createLog, deleteLogs } from '../../actions/log.actions';
import { buildTimeUI, phaseOfMoon } from '../../utils/functions';
import style from './campaign.container.scss';

class CampaignContainer extends Component {
  state = {
    weatherControls: false,
  }

  componentWillMount() {
    this.props.loadLogsIfNeeded();
  }

  increment = (initialMs, milliseconds) => {
    const ms = initialMs + milliseconds;
    const time = buildTimeUI(ms);

    const log = {
      day: time.days + 1,
      time: time.ms,
      season: 'winter',
      weather: 'String',
      notes: [],
    };

    this.props.createLog(log);
    this.pruneEmptyLogs();
  }

  pruneEmptyLogs() {
    const { logs } = this.props.historyState;
    const logIds = [];

    each(logs, (log) => {
      if (!log.notes.length) {
        logIds.push(log._id);
      }
    });

    this.props.deleteLogs(logIds);
  }

  render() {
    const { logs, error } = this.props.historyState;
    let errorToRender;
    let logsToRender;
    let timeKeeperToRender;

    if (error) {
      errorToRender = (
        'ERROR!'
      );
    }

    if (logs.length) {
      logsToRender = logs.map(log => (
        <LogContainer
          key={log._id}
          log={log}
        />
      ));
    }

    if (!logs.length) {
      timeKeeperToRender = (
        <TimeKeeper
          day={1}
          time={{
            hours: 0,
            minutes: 0,
            seconds: 0,
          }}
          sky={'night'}
          rotation={-180}
          increment={this.increment}
          initialMs={0}
          phaseOfMoon={1}
        />
      );
    } else {
      const log = logs[0];
      const timeUI = buildTimeUI(log.time);
      timeKeeperToRender = (
        <TimeKeeper
          day={log.day}
          time={{
            hours: timeUI.hours,
            minutes: timeUI.minutes,
            seconds: timeUI.seconds,
          }}
          sky={timeUI.sky}
          rotation={timeUI.rotation}
          increment={this.increment}
          initialMs={timeUI.ms}
          phaseOfMoon={phaseOfMoon(log.day, timeUI.hours)}
        />
      );
    }

    return (
      <div className={style.campaignContainer}>
        <div className={style.workTable} />
        <div className={style.history}>
          <div className={style.current}>
            <div className={style.time}>
              {timeKeeperToRender}
            </div>
            <div className={style.weather}>
              <WeatherTracker
                season={'winter'}
                currentWeatherCondition={'flurry'}
                temp={'very cold'}
                wind={'calm air'}
              />
            </div>
            <div className={style.terrain}>
              <TerrainPicker
                zone={'Temperate'}
                terrain={'hills'}
                terrains={[
                  {
                    terrain: 'hills',
                    active: 'active',
                  },
                  {
                    terrain: 'plains',
                  },
                  {
                    terrain: 'desert',
                  },
                  {
                    terrain: 'mountains',
                  },
                  {
                    terrain: 'swamp',
                  },
                  {
                    terrain: 'coast',
                  },
                  {
                    terrain: 'forest',
                  },
                ]}
              />
            </div>
          </div>

          <div className={style.heading}>Campaign History</div>
          {errorToRender}
          {logsToRender}
        </div>
      </div>
    );
  }
}

CampaignContainer.propTypes = {
  historyState: PropTypes.shape({
    logs: PropTypes.arrayOf(PropTypes.shape()),
    error: PropTypes.string,
  }).isRequired,
  loadLogsIfNeeded: PropTypes.func.isRequired,
  createLog: PropTypes.func.isRequired,
  deleteLogs: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    historyState: state.historyState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadLogsIfNeeded, createLog, deleteLogs }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignContainer);
