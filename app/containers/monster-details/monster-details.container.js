import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonstersContainer from '../monsters/monsters.container';
import MonsterDetails from '../../components/monster-details/monster-details.component';
import { loadMonster } from '../../actions/monsters.actions.js';
import style from './monster-details.scss';

class MonsterDetailsContainer extends Component {
  componentWillMount() {
    this.props.loadMonster(this.props.params.id);
  }

  render() {
    const { monster } = this.props.monstersState;
    let monsterToRender;
    if (monster) {
      monsterToRender = (
        <MonsterDetails className={style.monsterDetails} data={monster} />
      );
    }
    return (
      <div className={style.monsterDetailsContainer}>
        <div className={style.colOne}>
          <MonstersContainer />
        </div>
        <div className={style.colTwo}>
          <div>
            {monsterToRender}
          </div>
        </div>
      </div>
    );
  }
}

MonsterDetailsContainer.propTypes = {
  monstersState: PropTypes.object.isRequired,
  loadMonster: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    monstersState: state.monstersState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMonster }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonsterDetailsContainer);
