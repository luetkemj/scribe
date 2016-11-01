import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ListItem from '../../../components/list-item/list-item.component';
import { loadMonsterIfNeeded } from '../../../actions/monsters.actions';

function MonsterListItemContainer(props) {
  function onClickCallback() {
    browserHistory.push(`/monsters/${props.data._id}`);
    return props.loadMonsterIfNeeded(props.data._id);
  }

  const active = props.monstersState.monster._id === props.data._id;

  return (
    <ListItem
      active={active}
      name={props.data.name}
      onClick={onClickCallback}
    />
  );
}

MonsterListItemContainer.propTypes = {
  data: PropTypes.object.isRequired,
  loadMonsterIfNeeded: PropTypes.func.isRequired,
  monstersState: PropTypes.object.isRequired,
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
)(MonsterListItemContainer);
