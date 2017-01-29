import React from 'react';
import { Link } from 'react-router';

import style from './test-home.container.scss';

export default function TestHomeContainer() {
  return (
    <div className={style.home}>
      <h1>Test Home</h1>
      <ul className={style.list}>
        <li className={style.listItem}>
          <Link to="/ability-scores">Ability Scores</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/definition-list">Definition List</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/header">Header</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/list-item">List Item</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/log">Log</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/login-form">Login Form</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/note">Note</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/sidebar">Sidebar</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/spinner">Spinner</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/terrain-picker">Terrain Picker</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/time-keeper">Time Keeper</Link>
        </li>
        <li className={style.listItem}>
          <Link to="/weather-tracker">Weather Tracker</Link>
        </li>
      </ul>
    </div>
  );
}

TestHomeContainer.propTypes = {};
