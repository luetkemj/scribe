import React, { PropTypes, Component } from 'react';

import { leadingZero } from '../../utils/functions';

import style from './time-keeper.component.scss';

export default class TimeKeeper extends Component {
  state = {
    mounted: false,
    timerId: null,
  }

  componentWillMount() {
    this.state.timerId = () => {
      setTimeout(() => {
        this.setState({
          mounted: true,
        });
      }, 300);
    };
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerId);
  }

  increment6s = () => {
    this.props.increment(this.props.initialMs, 6000);
  };

  increment5m = () => {
    this.props.increment(this.props.initialMs, 300000);
  };

  increment10m = () => {
    this.props.increment(this.props.initialMs, 600000);
  };

  increment1h = () => {
    this.props.increment(this.props.initialMs, 3600000);
  };

  increment8h = () => {
    this.props.increment(this.props.initialMs, 28800000);
  };

  render() {
    let timeKeeperClasses = style.timeKeeper;
    if (this.state.mounted) {
      timeKeeperClasses += ` ${style.hasMounted}`;
    }

    const { day, time, sky, rotation, phaseOfMoon } = this.props;
    const counterRotation = rotation * -1;
    const rotate = {
      transform: `rotate(${rotation}deg)`,
    };
    const counterRotate = {
      transform: `rotate(${counterRotation}deg)`,
    };
    const skyColor = style[sky];

    const hours = leadingZero(time.hours);
    const minutes = leadingZero(time.minutes);
    const seconds = leadingZero(time.seconds);

    const phaseClass = `moon${phaseOfMoon}`;
    const moonClasses = `${style.moon} ${style[phaseClass]}`;

    return (
      <div className={timeKeeperClasses}>
        <div className={style.dayCount}>DAY {day}</div>
        <div className={style.sundial}>
          <div className={`${style.sky} ${skyColor}`}>
            <div className={style.stars} />
            <div className={style.sunMoon} style={rotate}>
              <div className={style.sun} style={counterRotate} />
              <div className={moonClasses} style={counterRotate} />
            </div>
          </div>
        </div>

        <div className={style.time}>
          {hours}
          <span className={style.colon}>:</span>
          {minutes}
          <span className={style.colon}>:</span>
          {seconds}
        </div>

        <div className={style.controls}>
          <button className={style.button} onClick={this.increment6s}>
            <span className={style.duration}>6</span>
            <span className={style.unit}>s</span>
          </button>
          <button className={style.button} onClick={this.increment5m}>
            <span className={style.duration}>5</span>
            <span className={style.unit}>m</span>
          </button>
          <button className={style.button} onClick={this.increment10m}>
            <span className={style.duration}>10</span>
            <span className={style.unit}>m</span>
          </button>
          <button className={style.button} onClick={this.increment1h}>
            <span className={style.duration}>1</span>
            <span className={style.unit}>h</span>
          </button>
          <button className={style.button} onClick={this.increment8h}>
            <span className={style.duration}>8</span>
            <span className={style.unit}>h</span>
          </button>
        </div>
      </div>
    );
  }
}

TimeKeeper.propTypes = {
  day: PropTypes.number.isRequired,
  time: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  phaseOfMoon: PropTypes.number.isRequired,
  sky: PropTypes.string.isRequired,
  rotation: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  initialMs: PropTypes.number.isRequired,
};
