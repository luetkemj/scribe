import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonsterDetails from '../components/monster-details/monster-details.component';
import { loadMonster } from '../actions/monsters.actions.js';

class MonsterDetailsContainer extends Component {
  componentWillMount() {
    this.props.loadMonster(this.props.params.id);
  }

  render() {
    const { monster } = this.props.monstersState;
    return (
      <div>
        <MonsterDetails data={monster} />
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
