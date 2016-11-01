import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonsterDetails from '../../../components/monster-details/monster-details.component';
import Spinner from '../../../components/spinner/spinner.component';
import { loadMonsterIfNeeded } from '../../../actions/monsters.actions.js';

class MonsterDetailsContainer extends Component {
  componentWillMount() {
    this.props.loadMonsterIfNeeded(this.props.params.id);
  }

  render() {
    const { monster, loadingMonster } = this.props.monstersState;
    let monsterToRender;
    let spinnerToRender;

    if (loadingMonster) {
      spinnerToRender = (
        <Spinner />
      );
    }

    if (monster) {
      monsterToRender = (
        <MonsterDetails data={monster} />
      );
    }
    return (
      <div>
        {spinnerToRender}
        {monsterToRender}
      </div>
    );
  }
}

MonsterDetailsContainer.propTypes = {
  monstersState: PropTypes.object.isRequired,
  loadMonsterIfNeeded: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    monstersState: state.monstersState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMonsterIfNeeded }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonsterDetailsContainer);
