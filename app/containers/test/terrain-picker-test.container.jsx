import React, { Component } from 'react';
import { each, findIndex } from 'lodash';

import TerrainPicker from '../../components/terrain-picker/terrain-picker.component';

export default class TerrainPickerTestContainer extends Component {
  state = {
    terrain: 'hills',
    terrains: [
      {
        terrain: 'hills',
      },
      {
        terrain: 'plains',
      },
      {
        terrain: 'desert',
      },
      {
        terrain: 'mountains',
        active: 'active',
      },
      {
        terrain: 'swamp',
      },
      {
        terrain: 'coast',
      },
      {
        terrain: 'forest',
      },
    ],
  }

  pickTerrain = (terrain) => {
    const terrains = this.state.terrains;
    const index = findIndex(terrains, { terrain });

    const newTerrains = [];
    let newTerrain;
    each(terrains, (value, key) => {
      if (key === index) {
        newTerrains.push({
          terrain: value.terrain,
          active: 'active',
        });
        newTerrain = value.terrain;
      } else {
        newTerrains.push({
          terrain: value.terrain,
        });
      }
    });

    this.setState({
      terrains: newTerrains,
      terrain: newTerrain,
    });
  }

  pickTerrain() {
    return this.state;
  }

  render() {
    return (
      <div>
        <TerrainPicker
          zone={'Temperate'}
          terrain={this.state.terrain}
          terrains={this.state.terrains}
          pickTerrain={this.pickTerrain}
        />
      </div>
    );
  }
}
