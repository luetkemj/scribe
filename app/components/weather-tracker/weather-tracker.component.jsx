import React, { PropTypes } from 'react';
import style from './weather-tracker.component.scss';

export default function WeatherTracker({
  season,
  currentWeatherCondition,
  temp,
  wind,
}) {
  return (
    <div className={style.weatherTracker}>
      <div className={style.current}>
        <p className={style.season}>{season}</p>
        <p className={style.condition}>{currentWeatherCondition}</p>
        <div
          className={`${style.weatherIcon} ${style[currentWeatherCondition]}`}
        />
        <p className={style.relativeTemp}>{ temp }</p>
        <p className={style.relativeTemp}>{ wind }</p>
      </div>
    </div>
  );
}

WeatherTracker.propTypes = {
  season: PropTypes.string.isRequired,
  currentWeatherCondition: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  wind: PropTypes.string.isRequired,
};
