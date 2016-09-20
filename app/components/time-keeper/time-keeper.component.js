import React, { PropTypes } from 'react';

import style from './time-keeper.component.scss';

export default function TimeKeeper({ day, time, sky, rotation, controls }) {
  const counterRotation = rotation * -1;
  const rotate = {
    transform: `rotate(${rotation}deg)`,
  };
  const counterRotate = {
    transform: `rotate(${counterRotation}deg)`,
  };
  const skyColor = style[sky];

  let key = 0;
  const controlsToRender = controls.map((control) =>
    <button className={style.button} onClick={control.onClick} key={key++}>
      <span className={style.duration}>{control.duration}</span>
      <span className={style.unit}>{control.unit}</span>
    </button>
  );

  function leadingZero(number) {
    let newNumber;
    if (number < 10) {
      newNumber = `0${number}`;
    } else {
      newNumber = number;
    }

    return newNumber;
  }

  const hours = leadingZero(time.hours);
  const minutes = leadingZero(time.minutes);
  const seconds = leadingZero(time.seconds);

  return (
    <div className={style.timeKeeper}>
      <div className={style.dayCount}>DAY {day}</div>

      <div className={style.sundial}>
        <div className={`${style.sky} ${skyColor}`}>
          <div className={style.stars} />
          <div className={style.sunMoon} style={rotate}>
            <div className={style.sun} style={counterRotate} />
            <div className={style.moon} style={counterRotate} />
          </div>
          <div className={style.cloudA} />
          <div className={style.cloudB} />
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
        {controlsToRender}
      </div>
    </div>
  );
}

TimeKeeper.propTypes = {
  day: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
  sky: PropTypes.string.isRequired,
  rotation: PropTypes.number.isRequired,
  controls: PropTypes.array.isRequired,
};
