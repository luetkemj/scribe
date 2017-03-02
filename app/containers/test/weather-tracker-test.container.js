import React, { Component } from 'react';

import WeatherTracker from '../../components/weather-tracker/weather-tracker.component';

export default class WeatherTrackerTestContainer extends Component {
  state = {
    icon: 'blizzard',
    controls: false,
  }

  changeWeather = (e) => {
    this.setState({ icon: e.target.dataset.weather });
    this.toggleControls();
  }

  toggleControls = () => {
    this.setState({ controls: !this.state.controls });
  }

  render() {
    return (
      <div>
        <WeatherTracker
          season={'winter'}
          currentWeatherCondition={this.state.icon}
          temp={'very cold'}
          changeWeather={this.changeWeather}
          weatherConditions={[
            'blizzard',
            'flurry',
            'cloud',
            'hail',
            'heavyRain',
            'rain',
            'moon',
            'partlyMoon',
            'sun',
            'partlySun',
            'sleet',
            'wind',
          ]}
          toggleControls={this.toggleControls}
          controls={this.state.controls}
        />
      </div>
    );
  }
}
