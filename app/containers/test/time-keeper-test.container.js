import React, { Component } from 'react';

import TimeKeeper from '../../components/time-keeper/time-keeper.component';

export default class TimeKeeperTestContainer extends Component {
  state = {
    day: 12,
    sky: 'night',
    rotation: 180,
    time: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    controls: [
      {
        duration: 6,
        unit: 's',
        onClick: this.noop,
      },
      {
        duration: 5,
        unit: 'm',
        onClick: this.noop,
      },
      {
        duration: 10,
        unit: 'm',
        onClick: this.noop,
      },
      {
        duration: 1,
        unit: 'h',
        onClick: this.noop,
      },
      {
        duration: 8,
        unit: 'h',
        onClick: this.noop,
      },
    ],
  };

  componentDidMount() {
    this.createInterval();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  noop() {}

  createInterval() {
    const intervalId = setInterval(() => {
      let hours = this.state.time.hours + 1;
      if (hours > 23) { hours = 0; }

      this.setState({
        rotation: this.state.rotation -= 15,
        time: {
          hours,
          minutes: 0,
          seconds: 0,
        },
      });

      if (this.state.time.hours === 6) {
        this.setState({ sky: 'dawn' });
      } else if (this.state.time.hours === 18) {
        this.setState({ sky: 'dusk' });
      } else if (this.state.time.hours < 6 || this.state.time.hours > 18) {
        this.setState({ sky: 'night' });
      } else if (this.state.time.hours > 6 && this.state.time.hours < 18) {
        this.setState({ sky: 'day' });
      }
    }, 1500);
    this.setState({ intervalId });
  }

  render() {
    return (
      <div>
        <TimeKeeper
          day={this.state.day}
          time={this.state.time}
          sky={this.state.sky}
          rotation={this.state.rotation}
          controls={this.state.controls}
        />
        <hr />
      </div>
    );
  }
}
