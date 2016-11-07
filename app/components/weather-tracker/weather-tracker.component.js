import React, { PropTypes } from 'react';
import style from './weather-tracker.component.scss';

export default function WeatherTracker({
  season,
  currentWeatherCondition,
  temp,
  changeWeather,
  weatherConditions,
  toggleControls,
  controls,
}) {
  let weatherTrackerClassNames = `${style.weatherTracker}`;

  if (controls) {
    weatherTrackerClassNames += ` ${style.activeControls}`;
  }

  let key = 0;
  const weatherConditionsToRender = weatherConditions.map(weatherCondition =>
    <div
      className={`${style.icon} ${style[weatherCondition]}`}
      onClick={changeWeather}
      data-weather={weatherCondition}
      key={key += 1}
    />
  );

  return (
    <div className={weatherTrackerClassNames}>
      <div className={style.current}>
        <p className={style.season}>{season}</p>
        <div
          className={`${style.weatherIcon} ${style[currentWeatherCondition]}`}
          onClick={toggleControls}
        />
        <p className={style.relativeTemp}>{ temp }</p>
      </div>
      <div className={style.controls}>
        {weatherConditionsToRender}
        <div className={style.close} onClick={toggleControls} />
      </div>
    </div>
  );
}

WeatherTracker.propTypes = {
  season: PropTypes.string.isRequired,
  currentWeatherCondition: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  changeWeather: PropTypes.func.isRequired,
  weatherConditions: PropTypes.arrayOf(PropTypes.string),
  toggleControls: PropTypes.func.isRequired,
  controls: PropTypes.bool.isRequired,
};
