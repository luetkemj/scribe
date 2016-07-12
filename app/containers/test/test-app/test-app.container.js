import React, { PropTypes } from 'react';

import style from '../../app/app.container.scss';

// function input is shorthand for const { children } = this.props
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
