import React from 'react';
import { Link } from 'react-router';

export default function TestHomeContainer() {
  return (
    <div>
      <h1>Test Home</h1>
      <ul>
        <li>
          <Link to="/ability-scores">Ability Scores</Link>
        </li>
        <li>
          <Link to="/definition-list">Definition List</Link>
        </li>
        <li>
          <Link to="/list-item">List Item</Link>
        </li>
        <li>
          <Link to="/log">Log</Link>
        </li>
        <li>
          <Link to="/login-form">Login Form</Link>
        </li>
        <li>
          <Link to="/note">Note</Link>
        </li>
        <li>
          <Link to="/spinner">Spinner</Link>
        </li>
        <li>
          <Link to="/terrain-picker">Terrain Picker</Link>
        </li>
        <li>
          <Link to="/time-keeper">Time Keeper</Link>
        </li>
        <li>
          <Link to="/weather-tracker">Weather Tracker</Link>
        </li>
      </ul>
    </div>
  );
}

TestHomeContainer.propTypes = {};
