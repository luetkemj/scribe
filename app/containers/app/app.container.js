import React, { PropTypes } from 'react';

import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import style from './app.container.scss';

// function input is shorthand for const { children, location } = this.props
export default function App({ children, location }) {
  const sidebarLinks = [
    {
      name: 'monsters',
      path: 'monsters',
    },
    {
      name: 'items',
      path: 'items',
    },
  ];

  return (
    <div className={style.app}>
      <Header />
      <div>
        <Sidebar location={location} links={sidebarLinks} />
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
};
