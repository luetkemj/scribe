import React, { Component } from 'react';

import TimeKeeper from '../../components/time-keeper/time-keeper.component';
import { buildTimeUI, phaseOfMoon } from '../../utils/functions';

export default class TimeKeeperTestContainer extends Component {
  state = {
    ms: 0,
    days: 0,
    hours: '00',
    minutes: '00',
    seconds: '00',
    sky: 'night',
    rotation: -180,
  }

  increment = (initialMs, milliseconds) => {
    // add initialMs to milliseconds to increment to get the target time
    const ms = initialMs + milliseconds;
    const timeUI = buildTimeUI(ms);
    this.setState({ ...timeUI });
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
          phaseOfMoon={phaseOfMoon(this.state.days + 1, this.state.hours)}
        />

        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    );
  }
}
