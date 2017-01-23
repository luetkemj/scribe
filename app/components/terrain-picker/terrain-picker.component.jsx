import React, { PropTypes } from 'react';

import style from './terrain-picker.component.scss';

export default function TerrainPicker({ zone, terrain }) {
  return (
    <div className={style.terrainPicker}>
      <p className={style.zone}>{zone}</p>
      <p className={style.terrain}>{terrain}</p>

      <div className={style.pickerWrap}>
        <div className={`${style.row} ${style.odd}`}>
          <button className={`${style.hex} ${style.hills}`} />
        </div>

        <div className={`${style.row} ${style.even}`}>
          <button className={`${style.hex} ${style.plains}`} />
          <button className={`${style.hex} ${style.desert}`} />
        </div>

        <div className={`${style.row} ${style.odd}`}>
          <button className={`${style.hex} ${style.mountains}`} />
        </div>

        <div className={`${style.row} ${style.even}`}>
          <button className={`${style.hex} ${style.swamp}`} />
          <button className={`${style.hex} ${style.coast}`} />
        </div>

        <div className={`${style.row} ${style.odd}`}>
          <button className={`${style.hex} ${style.forest}`} />
        </div>
      </div>
    </div>
  );
}

TerrainPicker.propTypes = {
  zone: PropTypes.string.required,
  terrain: PropTypes.string.required,
};
