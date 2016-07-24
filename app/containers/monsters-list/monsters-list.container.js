import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '../../components/list/list.component';
import MonsterListItemContainer from '../monster-list-item/monster-list-item.container';
import { loadMonsters } from '../../actions/monsters.actions.js';

class MonstersListContainer extends Component {
  componentWillMount() {
    this.props.loadMonsters();
  }

  render() {
    const { monsters, monstersLoaded } = this.props.monstersState;

    return (
      <List
        data={monsters}
        ListItemContainer={MonsterListItemContainer}
        loading={monstersLoaded}
      />
    );
  }
}

MonstersListContainer.propTypes = {
  monstersState: PropTypes.object.isRequired,
  loadMonsters: PropTypes.func.isRequired,
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
)(MonstersListContainer);
