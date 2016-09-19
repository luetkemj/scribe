import React from 'react';

import TimeKeeper from '../../components/time-keeper/time-keeper.component';

function noop() {
  console.log('noop');
}
let hours = 0;
const controls = [
  {
    duration: 6,
    unit: 's',
    onClick: noop,
  },
  {
    duration: 5,
    unit: 'm',
    onClick: noop,
  },
  {
    duration: 10,
    unit: 'm',
    onClick: noop,
  },
  {
    duration: 1,
    unit: 'h',
    onClick: noop,
  },
  {
    duration: 8,
    unit: 'h',
    onClick: noop,
  },
];
let rotate = 180;

const TimeKeepers = [];
let i;
for (i = 0; i < 24; i++) {
  TimeKeepers.push({
    day: 12,
    rotation: rotate,
    time: {
      hours: hours++,
      minutes: 0,
      seconds: 0,
    },
    controls,
  });
  rotate -= 15;
}

let skyColor;
let key = 0;

const TimeKeepersToRender = TimeKeepers.map((timeKeeper) => {
  if (timeKeeper.time.hours === 6) {
    skyColor = 'dawn';
  } else if (timeKeeper.time.hours === 18) {
    skyColor = 'dusk';
  } else if (timeKeeper.time.hours < 6 || timeKeeper.time.hours > 18) {
    skyColor = 'night';
  } else if (timeKeeper.time.hours > 6 && timeKeeper.time.hours < 18) {
    skyColor = 'day';
  }

  return (
    <div>
      <TimeKeeper
        day={timeKeeper.day}
        time={timeKeeper.time}
        sky={skyColor}
        rotation={timeKeeper.rotation}
        controls={timeKeeper.controls}
        key={key++}
      />
      <hr />
    </div>
  );
});

export default function TimeKeeperTestContainer() {
  return (
    <div>
      {TimeKeepersToRender}
    </div>
  );
}
