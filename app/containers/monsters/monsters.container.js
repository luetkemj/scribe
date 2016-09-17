import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonsterListItemContainer from '../monster-list-item/monster-list-item.container';
import List from '../../components/list/list.component';

import { loadMonsters } from '../../actions/monsters.actions.js';

class MonstersContainer extends Component {
  componentWillMount() {
    this.props.loadMonsters();
  }

  render() {
    const { monsters, loadingMonsters } = this.props.monstersState;
    return (
      <div>
        <List
          data={monsters}
          ListItemContainer={MonsterListItemContainer}
          loading={loadingMonsters}
        />
      </div>
    );
  }
}

MonstersContainer.propTypes = {
  monstersState: PropTypes.object.isRequired,
  loadMonsters: PropTypes.func.isRequired,
  children: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    monstersState: state.monstersState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMonsters }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonstersContainer);
