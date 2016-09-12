import React, { PropTypes } from 'react';

import Header from '../../components/header/header.component';
import style from './app.container.scss';

// function input is shorthand for const { children } = this.props
export default function App({ children }) {
  return (
    <div className={style.app}>
      <Header />
      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.any,
};
