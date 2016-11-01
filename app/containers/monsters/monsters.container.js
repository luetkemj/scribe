import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonsterListItemContainer from './monster-list-item/monster-list-item.container';
import List from '../../components/list/list.component';

import { loadMonstersIfNeeded } from '../../actions/monsters.actions.js';
import style from './monsters.container.scss';

class MonstersContainer extends Component {
  componentWillMount() {
    this.props.loadMonstersIfNeeded();
  }

  render() {
    const { monsters, loadingMonsters } = this.props.monstersState;
    return (
      <div className={style.monstersContainer}>
        <div className={style.colOne}>
          <List
            data={monsters}
            ListItemContainer={MonsterListItemContainer}
            loading={loadingMonsters}
          />
        </div>
        <div className={style.colTwo}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MonstersContainer.propTypes = {
  monstersState: PropTypes.object.isRequired,
  loadMonstersIfNeeded: PropTypes.func.isRequired,
  children: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    monstersState: state.monstersState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMonstersIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonstersContainer);
