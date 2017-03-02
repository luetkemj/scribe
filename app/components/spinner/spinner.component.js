import React, { PropTypes } from 'react';

import style from './spinner.component.scss';

export default function Spinner({ text }) {
  return (
    <div>
      <div className={style.loader} />
      <div className={style.text}>{text}</div>
    </div>
  );
}

Spinner.propTypes = {
  text: PropTypes.string,
};
