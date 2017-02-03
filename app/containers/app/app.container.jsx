import React, { PropTypes } from 'react';

import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import style from './app.container.scss';

// function input is shorthand for const { children, location } = this.props
export default function App({ children, location }) {
  const sidebarLinks = [
    {
      name: 'campaign',
      path: 'campaign',
    },
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
    <div className={`${style.app} ${style[location.pathname.slice(1)]}`}>
      <Header />
      <div className={style.content}>
        <div className={style.sidebarContainer}>
          <Sidebar location={location} links={sidebarLinks} />
        </div>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.shape(),
  location: PropTypes.shape({}),
};
