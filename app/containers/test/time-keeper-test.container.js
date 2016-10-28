import React, { Component } from 'react';

import TimeKeeper from '../../components/time-keeper/time-keeper.component';

export default class TimeKeeperTestContainer extends Component {
  state = {
    ms: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    sky: 'night',
    rotation: -180,
  }

  parseMs(milliseconds, divisor) {
    this.total = Math.trunc(milliseconds / divisor);
    this.remainder = milliseconds % divisor;

    return {
      total: this.total,
      remainder: this.remainder,
    };
  }

  increment = (initialMs, milliseconds) => {
    // add milliseconds to current time parsing it into days, hours, minutes, seconds
    const ms = initialMs + milliseconds;
    const days = this.parseMs(ms, 86400000);
    const hours = this.parseMs(days.remainder, 3600000);
    const minutes = this.parseMs(hours.remainder, 60000);
    const seconds = this.parseMs(minutes.remainder, 1000);

    // set the sky colors per time of day
    let sky;
    if (hours.total === 6) {
      sky = 'dawn';
    } else if (hours.total === 18) {
      sky = 'dusk';
    } else if (hours.total < 6 || hours.total > 18) {
      sky = 'night';
    } else if (hours.total > 6 && hours.total < 18) {
      sky = 'day';
    }

    // set the rotation of the sun and moon
    const rotation =
    // get the rotation based on total number of days
    ((days.total) * -360) +
    // get the rotation based on total number of hours minus half a day
    // to get the sun and moon in the right spot
    ((hours.total * -15) - 180) +
    // get the little bit of rotation from minutes cause the maths are even enough?
    (minutes.total * -0.25);

    this.setState({
      ms,
      days: days.total,
      hours: hours.total,
      minutes: minutes.total,
      seconds: seconds.total,
      sky,
      rotation,
    });
  }

  render() {
    return (
      <div>
        <TimeKeeper
          day={this.state.days + 1}
          time={{
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds: this.state.seconds,
          }}
          sky={this.state.sky}
          rotation={this.state.rotation}
          increment={this.increment}
          initialMs={this.state.ms}
        />
      </div>
    );
  }
}
