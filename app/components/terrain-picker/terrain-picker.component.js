import React, { PropTypes } from 'react';

import style from './terrain-picker.component.scss';

export default function TerrainPicker({ zone, terrain, terrains, pickTerrain }) {
  return (
    <div className={style.terrainPicker}>
      <p className={style.zone}>{zone}</p>
      <p className={style.terrain}>{terrain}</p>

      <div className={style.pickerWrap}>
        <div className={`${style.row} ${style.odd}`}>
          <button
            className={`${style.hex} ${style[terrains[0].terrain]} ${style[terrains[0].active]}`}
            onClick={() => { pickTerrain(terrains[0].terrain); }}
          />
        </div>

        <div className={`${style.row} ${style.even}`}>
          <button
            className={`${style.hex} ${style[terrains[1].terrain]} ${style[terrains[1].active]}`}
            onClick={() => { pickTerrain(terrains[1].terrain); }}
          />
          <button
            className={`${style.hex} ${style[terrains[2].terrain]} ${style[terrains[2].active]}`}
            onClick={() => { pickTerrain(terrains[2].terrain); }}
          />
        </div>

        <div className={`${style.row} ${style.odd}`}>
          <button
            className={`${style.hex} ${style[terrains[3].terrain]} ${style[terrains[3].active]}`}
            onClick={() => { pickTerrain(terrains[3].terrain); }}
          />
        </div>

        <div className={`${style.row} ${style.even}`}>
          <button
            className={`${style.hex} ${style[terrains[4].terrain]} ${style[terrains[4].active]}`}
            onClick={() => { pickTerrain(terrains[4].terrain); }}
          />
          <button
            className={`${style.hex} ${style[terrains[5].terrain]} ${style[terrains[5].active]}`}
            onClick={() => { pickTerrain(terrains[5].terrain); }}
          />
        </div>

        <div className={`${style.row} ${style.odd}`}>
          <button
            className={`${style.hex} ${style[terrains[6].terrain]} ${style[terrains[6].active]}`}
            onClick={() => { pickTerrain(terrains[6].terrain); }}
          />
        </div>
      </div>
    </div>
  );
}

TerrainPicker.propTypes = {
  zone: PropTypes.string.isRequired,
  terrain: PropTypes.string.isRequired,
  terrains: PropTypes.arrayOf(PropTypes.shape({
    terrain: PropTypes.string.isRequired,
    active: PropTypes.string,
  })).isRequired,
  pickTerrain: PropTypes.func.isRequired,
};
