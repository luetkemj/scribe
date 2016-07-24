import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonstersListContainer from '../monsters-list/monsters-list.container';
import { loadMonsters } from '../../actions/monsters.actions.js';

class MonstersContainer extends Component {
  componentWillMount() {
    this.props.loadMonsters();
  }

  render() {
    const { monsters } = this.props.monstersState;
    return (
      <div>
        <MonstersListContainer data={monsters} />
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
