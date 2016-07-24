import React, { PropTypes } from 'react';

import style from './test-app.container.scss';

export default function TestApp({ children }) {
  return (
    <div className={style.app}>
      {children}
    </div>
  );
}

TestApp.propTypes = {
  children: PropTypes.any,
};
