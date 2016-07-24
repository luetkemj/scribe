import React from 'react';
import { Link } from 'react-router';

import style from './test-home.container.scss';

export default function TestHomeContainer() {
  return (
    <div className={style.home}>
      <h1>Test Home</h1>
      <ul className={style.list}>
        <li className={style.listItem}>
          <Link to="/monster-details">Monster Details Component</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/spinner">Spinner Component</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/list-item">List Item Component</Link>
        </li>
      </ul>
    </div>
  );
}

TestHomeContainer.propTypes = {};
